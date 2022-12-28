const request = require('request');

const weatherGeoLocApi = (geoLocLatitudeLongitude, metricScientificFahrenheit, callback) => {
    const weatherGeoLocUrl = `http://api.weatherstack.com/current?access_key=0cfe36df4b9be8ceac8d8a469ce79f49&query=${geoLocLatitudeLongitude}&units=${metricScientificFahrenheit}`;
    
    request({url: weatherGeoLocUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather api! Try later or contact the administrator', undefined);
        } else if (!geoLocLatitudeLongitude || !metricScientificFahrenheit) {
            callback('Undefined geo localization or temperature unit', undefined);
        } else if (response.body.error) {
            callback('Unable to find weather in that location with that temperature unit', undefined);
        } else {
            callback(undefined, {
                weatherDescription: response.body.current.weather_descriptions,
                weatherIcons: response.body.current.weather_icons,
                temperature: response.body.current.temperature,
                uvIndex: response.body.current.uv_index,
                feelslike: response.body.current.feelslike,
                humidity: response.body.current.humidity,
                windSpeed: response.body.current.wind_speed,
                windDirection: response.body.current.wind_dir,
                airPressure: response.body.current.pressure,
                cloudcover: response.body.current.cloudcover,
                precipitation: response.body.current.precip,
                visibility: response.body.current.visibility 
            })
        }
    });
}

module.exports = weatherGeoLocApi;