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
import { pollutionHelp } from "./helpdata";

const key = "AIzaSyDQZ7VhiuFQQD65-kvQMMa_la-oaEBdsXk";

const Main = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [doesCityExist, setCityExistence] = useState(true);
  const [enteredName, setEnteredName] = useState("");

  const [coordinates, changeCoordinates] = useState({
    lat: "",
    lon: "",
    NorthOrSouth: "",
    EastOrWest: "",
    country: "",
  });

  const [pollution, setPollution] = useState([]);

  const [connectionErrorMessage, setConnectionErrorMessage] = useState("");

  const setCoordinates = (event, enteredName) => {
    setEnteredName(enteredName);
    getCoordinates(event, enteredName)
      .then((response) => response.data)
      .then((res) => {
        if (typeof res.length == "undefined") {
          setCityExistence(false);
        } else {
          setLoading(true);
          setCityExistence(true);
          changeCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            lat: res[0].lat,
            lon: res[0].lon,
            NorthOrSouth: parseFloat(res[0].lat) > 0 ? "N" : "S",
            EastOrWest: parseFloat(res[0].lon) > 0 ? "E" : "W",
            country: getCountry(res[0].display_name),
          }));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const countPollution = (coordinates, hours, apiKeyNumber) => {
    console.log(apiKeyNumber);
    getPollution(coordinates, hours, apiKeyNumber)
      .then((res) => {
        setPollution((prevPollution) => [...res.data.data])
        setConnectionErrorMessage('')
      })
      .catch((error) => {
        switch (true) {
          case error.response.status == 429:
            if (apiKeyNumber < keys.length - 1) {
              apiKeyNumber++;
              countPollution(coordinates, hours, apiKeyNumber);
            } else {
              console.log('Error while connecting to forecast API. More info: ',error.response)
              setConnectionErrorMessage(
                "Because of data provider's requests limit, getting and displaying more data is currently not available. Try again after 24 hours."
              );
            }
          case (error.response.status >= 300 && error.response.status < 400):
            console.log('Error while connecting to forecast API. More info: ',error.response)
            setConnectionErrorMessage("Page has been redirected")
            break;
          case (error.response.status >= 400 && error.response.status != 429 && error.response.status < 500):
            console.log('Error while connecting to forecast API. More info: ',error.response)
            setConnectionErrorMessage("Client error has occured")
            break;
          case error.response.status >= 500:
            console.log('Error while connecting to forecast API. More info: ',error.response)
            setConnectionErrorMessage(
              "Server error has occured. Try again later"
            );
            break;
            default:
              setConnectionErrorMessage(
                "Undefined error has occured. Try again later."
              )
        }
        console.error("Blad: ", error.response.status);
      });
  };

  useEffect(() => {
    if (coordinates.lat.length > 0 && coordinates.lon.length > 0) {
      countPollution(coordinates, "72", 0);
    }
  }, [coordinates]);
  console.log(coordinates);

  let content = "";

  if (enteredName.length > 0) {
    if (doesCityExist) {
      if (connectionErrorMessage.length > 0) {
        content = <div className='error__wrap'>{connectionErrorMessage}</div>
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
      content = <Error cityName={enteredName} />;
    }
  } else {
    content = <About />;
  }

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
