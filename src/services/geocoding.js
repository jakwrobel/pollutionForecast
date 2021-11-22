import axios from "axios";

//Makes API call and returns promise:
export const getCoordinates = (event, cityName) => {
  let options = {
    method: "GET",
    url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/search",
    params: { q: cityName, "accept-language": "en", polygon_threshold: "0.0" },
    headers: {
      "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
      "x-rapidapi-key": "dd31c8c14cmsh2ab1c44907f3c88p1bcb1cjsnd1b772d2c469",
    },
  };

  event.preventDefault();
  return axios.request(options);
};
