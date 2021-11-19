import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Searchbar from "./searchBar";
import Results from "./results";
import About from "./about";
import Error from "./error";
import Footer from "./footer";
import { getCoordinates } from "../services/geocoding";
import { getPollution, keys } from "../services/pollution";
import { getCountry } from "../functions/results-functions";
// import { pollutionHelp } from "./helpdata";

const Main = ({ children }) => {
  const [enteredName, setEnteredName] = useState("");

  const [coordinates, changeCoordinates] = useState({
    lat: "",
    lon: "",
    NorthOrSouth: "",
    EastOrWest: "",
    country: "",
  });

  const [pollution, setPollution] = useState([]);

  const [errorMessage, setErrorMessage] = useState({
    type:'',
    message:''
  });

  const setCoordinates = (event, enteredName) => {
    setEnteredName(enteredName);
    getCoordinates(event, enteredName)
      .then((response) => response.data)
      .then((res) => {
        if (typeof res.length == "undefined") {
          setErrorMessage(prev=>({...prev, type:'content', message:'City does not exist'}));
        } else {
          setErrorMessage(prev=>({...prev, type:'', message:''}));
          changeCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            lat: res[0].lat,
            lon: res[0].lon,
            NorthOrSouth: parseFloat(res[0].lat) > 0 ? "N" : "S",
            EastOrWest: parseFloat(res[0].lon) > 0 ? "E" : "W",
            country: getCountry(res[0].display_name),
          }));
        }
      })
      .catch((error) => {
        switch (true) {
          case error.response.status == 429:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setErrorMessage(prev=>({...prev, type:'connection', message:
              "Too many requests. You can do up to 4 requests per second"})
            );
            break;
          case error.response.status >= 300 && error.response.status < 400:
            console.log(
              "Error while connecting to geocoding API. More info: ",
              error.response
            );
            setErrorMessage(prev=>({...prev, type:'connection', message:"Page has been redirected"}));
            break;
          case error.response.status >= 400 &&
            error.response.status != 429 &&
            error.response.status < 500:
            console.log(
              "Error while connecting to geocoding API. More info: ",
              error.response
            );
            setErrorMessage(prev=>({...prev, type:'connection', message:"Client error has occured"}));
            break;
          case error.response.status >= 500:
            console.log(
              "Error while connecting to geocoding API. More info: ",
              error.response
            );
            setErrorMessage(prev=>({...prev, type:'connection', message:
              "Server error has occured. Try again later"})
            );
            break;
          default:
            setErrorMessage(prev=>({...prev, type:'connection', message:
              "Undefined error has occured. Try again later."})
            );
        }
      });
  };

  const countPollution = (coordinates, hours, apiKeyNumber) => {
    console.log(apiKeyNumber);
    getPollution(coordinates, hours, apiKeyNumber)
      .then((res) => {
        setPollution((prevPollution) => [...res.data.data]);
        setErrorMessage(prev=>({...prev, type:'', message:""}));
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
              setErrorMessage(prev=>({...prev, type:'connection', message:
                "Because of data provider's requests limit, getting and displaying more data is currently not available. Try again after 24 hours."})
              );
            }
            break;
          case error.response.status >= 300 && error.response.status < 400:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setErrorMessage(prev=>({...prev, type:'connection', message:"Page has been redirected"}));
            break;
          case error.response.status >= 400 &&
            error.response.status != 429 &&
            error.response.status < 500:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setErrorMessage(prev=>({...prev, type:'connection', message:"Client error has occured"}));
            break;
          case error.response.status >= 500:
            console.log(
              "Error while connecting to forecast API. More info: ",
              error.response
            );
            setErrorMessage(prev=>({...prev, type:'connection', message:
              "Server error has occured. Try again later"})
            );
            break;
          default:
            setErrorMessage(prev=>({...prev, type:'connection', message:
              "Undefined error has occured. Try again later."})
            );
        }
      });
  };

  let content = "";

  if (enteredName.length > 0) {
      if (errorMessage.type.length > 0) {
        content = <Error type={errorMessage.type} message= {errorMessage.message} cityName={enteredName} />;
      } else {
        content = (
          <Results
            cityName={enteredName}
            coordinates={coordinates}
            pollution={pollution}
          />
        );
      }
  } else {
    content = <About />;
  }

  useEffect(() => {
    if (coordinates.lat.length > 0 && coordinates.lon.length > 0) {
      countPollution(coordinates, "72", 0);
    }
  }, [coordinates]);
  console.log(coordinates);

  return (
    <>
      <Header />
      <Searchbar setCoordinates={setCoordinates} />
      {content}
      <Footer />
    </>
  );
};

export default Main;
