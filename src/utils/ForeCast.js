const request = require('request')

const forecast = (latitude , longitude, callback) => {
    const baseUrl = 'http://api.weatherstack.com'; 
    const url =  '/current?access_key=611440777b1550a010ef315da6a4f990&query='+ encodeURIComponent(latitude) +','+encodeURIComponent(longitude) +'&units=f'

    request({url,baseUrl,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather services',undefined);
        }
        else if(body.error){
            callback(body.error,undefined);

        }
        else{
            callback(undefined,{
                Message:body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature + ' degrees out. There is '+ body.current.precip + '% chance of rain'
            })
        }
    })

}

module.exports = {
    forecast:forecast
}