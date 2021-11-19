import axios from "axios";

export const keys=['50bf83cea7msh256e50596707c81p1bda08jsnfa836124e987']

let others=['8cb705c6cfmsh0a3c87eb6ca9cf5p14a1a7jsn92aa1ee82eab','dd31c8c14cmsh2ab1c44907f3c88p1bcb1cjsnd1b772d2c469']


export const getPollution = (coordinates,hours,keyNumber)=>{
    var options = {
        method: 'GET',
        url: 'https://air-quality.p.rapidapi.com/forecast/airquality',
        params: {lat: coordinates.lat, lon: coordinates.lon, hours: hours},
        headers: {
          'x-rapidapi-host': 'air-quality.p.rapidapi.com',
          'x-rapidapi-key': keys[keyNumber]
        }
      }; 
      

      return (
    axios.request(options)
      )
  }