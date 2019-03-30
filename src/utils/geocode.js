const request = require('request');

const geocode = (address, callback)=> {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoiZHdpcGlrYSIsImEiOiJjanR0Y2dkZXgwd2IxM3lwbGY1OGJ6d24xIn0.YcmlfRJWLKxOFOMYA7a5jQ&limit=1";
    request({url, json:true},(error, {body})=>{
        if(error)
        {
            callback("Couldn't connect to the server", undefined);
        }
        else if(body.features.length === 0 )
        {
            callback("Couldn't find the location. Try another search", undefined);
        }
        else
        {
            const loc = body.features;
            callback(undefined, {
                latitude : loc[0].center[1],
                longitude : loc[0].center[0],
                location: loc[0].place_name
            });
        }
    });

}
module.exports = geocode;