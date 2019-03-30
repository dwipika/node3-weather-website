const request = require('request');
const forecast = (latitude, longitude, callback)=>
{
    const url = "https://api.darksky.net/forecast/a300dedc9dd5b767601ec37c2eb1e556/" + latitude + "," + longitude;
    request({url, json:true}, (error, {body})=>{
        if(error)
        {
            callback("Couldn't connect to the server", undefined);
        }
        else if(body.error)
        {
            callback("Cannot find location.", undefined);
        }
        else
        {
        callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain.`);
        }
    });
}

module.exports = forecast;
