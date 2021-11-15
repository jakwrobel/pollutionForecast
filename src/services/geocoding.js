import axios from 'axios'

export const getCoordinates = (event,cityName)=>{

    let options2 = {
        method: 'GET',
        url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search',
        params: {q: cityName, 'accept-language': 'en', polygon_threshold: '0.0'},
        headers: {
          'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
          'x-rapidapi-key': '50bf83cea7msh256e50596707c81p1bda08jsnfa836124e987'
        }
      };  
      
    event.preventDefault()
      return (
    axios.request(options2)
      )
  }

// let options = {
//     method: 'GET',
//     url: 'https://weatherapi-com.p.rapidapi.com/ip.json',
//     params: {q: '<REQUIRED>'},
//     headers: {
//       'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
//       'x-rapidapi-key': '50bf83cea7msh256e50596707c81p1bda08jsnfa836124e987'
//     }
//   };
  
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });

// export const getData = ()=>{
//     return axios.request(options).then(function (response) {
//         console.log(response.data);
//     }).catch(function (error) {
//         console.log('blad');
//     });
// }