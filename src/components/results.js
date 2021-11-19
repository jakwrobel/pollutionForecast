import React from "react";
import { pollutionHelp } from "./helpdata";
import Item from "./item";
import {
  slideToPrev,
  slideToNext,
  setAqiColor,
} from "../functions/results-functions";

const Results = ({ cityName, coordinates, pollution }) => {

  return (
    <div className="results__wrap">
      
    {cityName &&
    <>
      <h1>{cityName}, {coordinates.country} ({Math.abs(parseFloat(coordinates.lat).toFixed(2))}{coordinates.NorthOrSouth}, {Math.abs(parseFloat(coordinates.lon).toFixed(2))}{coordinates.EastOrWest}) </h1>
      <div className="results__title">
        <h2>AQI</h2> 
        <div className="results__info-aqi">
        <img src="./images/info.svg"/>
        </div>
        </div>
      <Item itemType="aqi" pollutionHelp={pollution} barvalueScale={5} />

      <div className="results__title">
        <h2>PM10</h2> 
        <div className="results__info-pm10">
        <img src="./images/info.svg"/>
        </div>
        </div>
      <Item itemType="pm10" pollutionHelp={pollution} barvalueScale={2.5} />

      <div className="results__title">
        <h2>PM25</h2> 
        <div className="results__info-pm25">
        <img src="./images/info.svg"/>
        </div>
        </div>
      <Item itemType="pm25" pollutionHelp={pollution} barvalueScale={0.5} />

      <div className="results__title">
        <h2>O3</h2> 
        <div className="results__info-o3">
        <img src="./images/info.svg"/>
        </div>
        </div>
      <Item itemType="o3" pollutionHelp={pollution} barvalueScale={3} />

      <div className="results__title">
        <h2>SO2</h2> 
        <div className="results__info-so2">
        <img src="./images/info.svg"/>
        </div>
        </div>
      <Item itemType="so2" pollutionHelp={pollution} barvalueScale={0.5} />

      <div className="results__title">
        <h2>NO2</h2> 
        <div className="results__info-no2">
        <img src="./images/info.svg"/>
        </div>
        </div>
      <Item itemType="no2" pollutionHelp={pollution} barvalueScale={3} />

      <div className="results__title">
        <h2>CO</h2> 
        <div className="results__info-co">
        <img src="./images/info.svg"/>
        </div>
        </div>
      <Item itemType="co" pollutionHelp={pollution} barvalueScale={10} />
      </>
    }
    </div>
  );
};

export default Results;
