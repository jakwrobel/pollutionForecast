import axios from "axios";

//API keys:
export const keys = [
  "50bf83cea7msh256e50596707c81p1bda08jsnfa836124e987",
  "8cb705c6cfmsh0a3c87eb6ca9cf5p14a1a7jsn92aa1ee82eab",
  "dd31c8c14cmsh2ab1c44907f3c88p1bcb1cjsnd1b772d2c469",
  "edabb595a8mshc8280ddb349e608p156bb9jsn8072ab5b0200",
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
