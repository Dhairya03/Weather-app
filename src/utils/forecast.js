const axios = require("axios");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=b02ddea0319c4e57a3c35006231304&q=" +
    latitude +
    "," +
    longitude +
    "&days=1&aqi=yes&alerts=yes";
  //const url='https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd026/'+latitude+','+longitude
  // axios.get({url,json:true},(error,{body})=>{
  //     if(error){
  //         callback('Unable to connect to weather services!!',undefined)
  //     }else if(body.forecast.length===0){
  //         callback('Unable to find location.Try another search.',undefined)
  //     }else{
  //         callback(undefined,body.current.condition.text+ ' It is currently '+ body.current.temp_c+ 'degrees out there.There is a '+body.current.precip_mm+'% chance of rain.')
  //     }
  // })
  //console.log(url);
  axios
    .get(url)
    .then((response) => {
      //console.log(response.data.current)
      if (response.data.current) {
        const body = response.data.current;
        callback(
          undefined,
          body.condition.text +
            "!!!!. It is currently " +
            body.temp_c +
            "degree celsius out there.There is a " +
            body.precip_mm +
            "% chance of rain."
        );
      } else {
        callback("Unable to find location.Try another search.", undefined);
      }
    })
    .catch((error) => {
      callback("Unable to connect to weather services!!", undefined);
    });
};
module.exports = forecast;
