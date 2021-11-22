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
import axios from "axios";
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
  console.log(actions);

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
          case error.response.status == 429:
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
            error.response.status != 429 &&
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

  const countPollution = (coordinates, hours, apiKeyNumber) => {
    getPollution(coordinates, hours, apiKeyNumber)
      .then((res) => {
        setPollution(res.data.data);
        resetError();
      })
      .catch((error) => {
        switch (true) {
          case error.response.status == 429:
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
            error.response.status != 429 &&
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

  useEffect(() => {
    if (location.lat.length > 0 && location.lon.length > 0) {
      countPollution(location, "72", 0);
    }
  }, [location]);
  console.log(error);
  return (
    <>
      <Header />
      <Searchbar setCoordinates={setCoordinates} />
      {content}
      <Footer />
    </>
  );
};

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
