import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Searchbar from "./searchBar";
import Results from "./results";
import About from "./about";
import Error from "./error";
import Footer from "./footer";
import { getCoordinates } from "../services/geocoding";
import { getPollution } from "../services/pollution";
import { getCountry } from "../functions/results-functions";
import { pollutionHelp } from "./helpdata";

const key = "AIzaSyDQZ7VhiuFQQD65-kvQMMa_la-oaEBdsXk";

const Main = ({ children }) => {

  const[isLoading,setLoading]=useState(true);
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

  const setCoordinates = (event, enteredName) => {
    setEnteredName(enteredName);
    getCoordinates(event, enteredName)
      .then((response) => response.data)
      .then((res) => {
        if (typeof res.length == "undefined") {
          setCityExistence(false);
        } else {
          setLoading(true)
          setCityExistence(true);
          changeCoordinates((prevCoordinates) => ({
            ...prevCoordinates,
            lat: res[0].lat,
            lon: res[0].lon,
            NorthOrSouth: parseFloat(res[0].lat) > 0 ? "N" : "S",
            EastOrWest: parseFloat(res[0].lon) > 0 ? "E" : "W",
            country: getCountry(res[0].display_name),
          }))
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const countPollution = (coordinates, hours) => {
    getPollution(coordinates, hours, 1).then((res) =>
      setPollution((prevPollution) => [...res.data.data])
    );
  };

  useEffect(() => {
    if (coordinates.lat.length > 0 && coordinates.lon.length > 0) {
      countPollution(coordinates, "72");
    }
  }, [coordinates]);
  console.log(coordinates);

  return (
    <>
      <Header />
      <Searchbar setCoordinates={setCoordinates} />
      {enteredName.length > 0 ? 
      doesCityExist ?
      (
        <Results
          cityName={enteredName}
          coordinates={coordinates}
          pollution={pollution}
        />
      )
      :(
        <Error  cityName={enteredName}/>
      ) : (
        <About/>
      )}
      <Footer />
    </>
  );
};

export default Main;
