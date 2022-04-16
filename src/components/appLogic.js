//Logic of Application

import React, { useEffect } from "react";
import Header from "./header";
import Searchbar from "./searchBar";
import Results from "./results";
import About from "./about";
import Error from "./error";
import Footer from "./footer";
import { getCoordinates } from "../services/geocoding";
import { getPollution, keys } from "../services/pollution";
import { getCountry } from "../functions/results-functions";

import actions from "../redux/actions";
import { connect } from "react-redux";

const AppLogic = ({
  location,
  pollution,
  error,
  setEnteredName,
  changeCoordinates,
  setPollution,
  setError,
  resetError,
}) => {
  //Function does 2 things:
  //1) Runs setEnteredName func, which returns appropriate dispatch and saves city name, entered by user to the store
  //2) Runs getCoordinates func, which returns axios promise. If it's resolved - then it checks if city exists. if yes - func saves it + set existing error to none, if no -
  //   it sets existing error to "City does not exist."
  //   If promise is rejected, func sets existing error to some other value, according to error response status.
  // Function getCoordinates is imported from services. Functions: setEnteredName, setError are defined in mapDispatchToProps and they return appropriate dispatch which changes redux store
  //Function is passed as argument to searchBar component and it's triggered when user submits form (with onSubmit event, and city wrote by user as arguments)

  const setCoordinates = (event, enteredName) => {
    setEnteredName(enteredName);
    getCoordinates(event, enteredName)
      .then((response) => response.data)
      .then((res) => {
        if (typeof res.length == "undefined") {
          setError("content", "City does not exist");
        } else {
          resetError();
          changeCoordinates(res[0], getCountry);
        }
      })
      .catch((error) => {
        switch (true) {
          case error.response.status === 429:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setError(
              "connection",
              "Too many requests. You can do up to 4 requests per second"
            );
            break;
          case error.response.status >= 300 && error.response.status < 400:
            console.log(
              "Error while connecting to geocoding API. More info: ",
              error.response
            );
            setError("connection", "Page has been redirected");
            break;
          case error.response.status >= 400 &&
            error.response.status !== 429 &&
            error.response.status < 500:
            console.log(
              "Error while connecting to geocoding API. More info: ",
              error.response
            );
            setError("connection", "Client error has occured");
            break;
          case error.response.status >= 500:
            console.log(
              "Error while connecting to geocoding API. More info: ",
              error.response
            );
            setError("connection", "Server error has occured. Try again later");
            break;
          default:
            setError(
              "connection",
              "Undefined error has occured. Try again later."
            );
        }
      });
  };

  //Function runs getPollution function, which returns axios promise. If it's resolved, it does 2 things:
  // 1) Runs setPollution function. This function comes from mapDispatchToProps and sets pollution
  // to value which it get's from promise.
  // 2) Runs resetError, which comes also from mapDispatchToProps, and sets existing error to none
  // If it's rejected, it handles error in similar way then function "setCoordinates" from above.
  const countPollution = (coordinates, hours, apiKeyNumber) => {
    getPollution(coordinates, hours, apiKeyNumber)
      .then((res) => {
        setPollution(res.data.data);
        resetError();
      })
      .catch((error) => {
        switch (true) {
          case error.response.status === 429:
            //If error response from API is 429, and we still have new API keys in array of API keys,
            //function calls itself recursively with another API key as argument.
            //Recursion stops when we don't have any new keys which doesn't cause 429 error
            //I wrote it because of data provider's limits of daily API calls.
            if (apiKeyNumber < keys.length - 1) {
              apiKeyNumber++;
              countPollution(coordinates, hours, apiKeyNumber);
            } else {
              console.log(
                "Error while connecting to forecast API. More info: ",
                error.response
              );
              setError(
                "connection",
                "Because of data provider's requests limit, getting and displaying more data is currently not available. Try again after 24 hours."
              );
            }
            break;
          case error.response.status >= 300 && error.response.status < 400:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setError("connection", "Page has been redirected");
            break;
          case error.response.status >= 400 &&
            error.response.status !== 429 &&
            error.response.status < 500:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setError("connection", "Client error has occured");
            break;
          case error.response.status >= 500:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setError("connection", "Server error has occured. Try again later");
            break;
          default:
            setError(
              "connection",
              "Undefined error has occured. Try again later."
            );
        }
      });
  };

  let content = "";

  //According to current state (any existing errors, existing correct response from API or existing none of them), I set page content to different components:

  if (location.enteredName.length > 0) {
    if (error.errorType.length > 0) {
      content = (
        <Error
          type={error.errorType}
          message={error.errorMessage}
          cityName={location.enteredName}
        />
      );
    } else {
      content = (
        <Results
          cityName={location.enteredName}
          coordinates={location}
          pollution={pollution}
        />
      );
    }
  } else {
    content = <About />;
  }

  //countPollution func runs every time, when location has changed. Because of that it changes pollution prediction in store to values for another city and app renders again with correct values for another city:
  useEffect(() => {
    if (location.lat.length > 0 && location.lon.length > 0) {
      countPollution(location, "72", 0);
    }
  }, [location]);

  return (
    <>
      <Header />
      <Searchbar setCoordinates={setCoordinates} />
      {content}
      <Footer />
    </>
  );
};

//Redux part. All dispatch argument functions are imported from actions.js:

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEnteredName: (enteredName) =>
      dispatch(actions.setEnteredName(enteredName)),
    changeCoordinates: (res, func) =>
      dispatch(actions.changeCoordinates(res, func)),
    setPollution: (data) => dispatch(actions.setPollution(data)),
    setError: (errorType, errorMessage) =>
      dispatch(actions.setError(errorType, errorMessage)),
    resetError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLogic);
