import axios from "axios";

export const keys=['50bf83cea7msh256e50596707c81p1bda08jsnfa836124e987','8cb705c6cfmsh0a3c87eb6ca9cf5p14a1a7jsn92aa1ee82eab','dd31c8c14cmsh2ab1c44907f3c88p1bcb1cjsnd1b772d2c469','edabb595a8mshc8280ddb349e608p156bb9jsn8072ab5b0200']

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

// export const handlePollutionErrors = (response, apiKeyNumber, coordinates, hours, countPollution, setConnectionErrorMessage)=>{
//     switch (true) {
//       case response.status == 429:
//         if (apiKeyNumber < keys.length - 1) {
//           apiKeyNumber++;
//           countPollution(coordinates, hours, apiKeyNumber);
//         } else {
//           console.log('Error while connecting to forecast API. More info: ', response)
//           setConnectionErrorMessage(
//             "Because of data provider's requests limit, getting and displaying more data is currently not available. Try again after 24 hours."
//           );
//         }
//         break;
//       case (response.status >= 300 && response.status < 400):
//         console.log('Error while connecting to forecast API. More info: ',response)
//         setConnectionErrorMessage("Page has been redirected")
//         break;
//       case (response.status >= 400 && response.status != 429 && response.status < 500):
//         console.log('Error while connecting to forecast API. More info: ',response)
//         setConnectionErrorMessage("Client error has occured")
//         break;
//       case response.status >= 500:
//         console.log('Error while connecting to forecast API. More info: ',response)
//         setConnectionErrorMessage(
//           "Server error has occured. Try again later"
//         );
//         break;
//         default:
//           setConnectionErrorMessage(
//             "Undefined error has occured. Try again later."
//           )
//     }
// }