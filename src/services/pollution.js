import axios from "axios";

//API keys:
export const keys = [
  "0a3721b488mshff1100bffdf698ep1c7b70jsn159ebd258e49"
];


//Makes API call and returns promise:
export const getPollution = (coordinates, hours, keyNumber) => {
  const options = {
    method: "GET",
    url: "https://air-quality.p.rapidapi.com/forecast/airquality",
    params: { lat: coordinates.lat, lon: coordinates.lon, hours: hours },
    headers: {
      "x-rapidapi-host": "air-quality.p.rapidapi.com",
      "x-rapidapi-key": keys[keyNumber],
    },
  };

  return axios.request(options);
};
