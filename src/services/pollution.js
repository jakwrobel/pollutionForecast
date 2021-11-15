import axios from "axios";

export const getPollution = (coordinates,hours)=>{
let key1='50bf83cea7msh256e50596707c81p1bda08jsnfa836124e987'
    var options = {
        method: 'GET',
        url: 'https://air-quality.p.rapidapi.com/forecast/airquality',
        params: {lat: coordinates.lat, lon: coordinates.lon, hours: hours},
        headers: {
          'x-rapidapi-host': 'air-quality.p.rapidapi.com',
          'x-rapidapi-key': '8cb705c6cfmsh0a3c87eb6ca9cf5p14a1a7jsn92aa1ee82eab'
        }
      }; 
      

      return (
    axios.request(options)
      )
  }