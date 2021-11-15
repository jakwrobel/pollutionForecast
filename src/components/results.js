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
        <h2>Air quality Index</h2> <img src="./images/info.svg"/>
        </div>
      <Item itemType="aqi" pollutionHelp={pollution} barvalueScale={5} />

      <h2>PM10</h2>
      <Item itemType="pm10" pollutionHelp={pollution} barvalueScale={2.5} />

      <h2>PM25</h2>
      <Item itemType="pm25" pollutionHelp={pollution} barvalueScale={0.5} />

      <h2>O3</h2>
      <Item itemType="o3" pollutionHelp={pollution} barvalueScale={3} />

      <h2>SO2</h2>
      <Item itemType="so2" pollutionHelp={pollution} barvalueScale={0.5} />

      <h2>NO2</h2>
      <Item itemType="no2" pollutionHelp={pollution} barvalueScale={3} />

      <h2>CO</h2>
      <Item itemType="co" pollutionHelp={pollution} barvalueScale={10} />
      </>
    }
    </div>
  );
};

export default Results;
