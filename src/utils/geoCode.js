const request = require('request');

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json';
    const queryStringObject = {access_token : 'pk.eyJ1Ijoib21pbmF2aWsiLCJhIjoiY2tiM2I3MnVqMDN1bTJyczBxZThiZGtoaiJ9._YQlfoZ9opWsjxw-VFMp1A',limit:1};
  
    request({url ,json : true,qs:queryStringObject},(error,{body}) =>{
      if(error){
        callback('Unable to connect to weather services',undefined);
      }
      else if(body.features.length === 0){
        callback('Unable to find location '+ body.query[0]+' ,try another search',undefined)
      }
      else{
        callback(undefined , {
        latitutde : body.features[0].center[1],
        longitude : body.features[0].center[0],
        location : body.features[0].place_name
        
      })
  
      }
    })
  
  }
  
  
  
  module.exports = {
     geoCode : geoCode
  }