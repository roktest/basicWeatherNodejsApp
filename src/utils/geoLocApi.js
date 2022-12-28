const request = require('request');

const geoLocApi = (location, units, callback) => {
    const geoLocUrl = `http://api.positionstack.com/v1/forward?access_key=08384ef1cd6d42de1f4cf5134bb688b9&query=${encodeURIComponent(location)}&units=${encodeURIComponent(units)}`;


    request({url: geoLocUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to geo-localization api. Try later or contact the administrator', undefined);
        } else if (!location){
            callback('Undefined location', undefined);
        } else if (response.body.data === undefined || response.body.data.length === 0) {
            callback('Unable to find that location. Try somewhere else', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                country: response.body.data[0].country,
                region: response.body.data[0].region
            });
        }
    })
}

module.exports = geoLocApi;