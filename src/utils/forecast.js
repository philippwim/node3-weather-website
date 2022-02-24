const request = require("request");

const forecast = (lat, lon, fnCallback) => {

    const url = "http://api.weatherstack.com/current?access_key=2de36929d123a655332d1235d9c366b8&query=" + lon + "," + lat + "";


    request({ url, json: true }, (error, {body}) => {

        if (error) {
            fnCallback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            fnCallback("Unable to find location", undefined);
        } else {
            const {temperature, feelslike, weather_descriptions, humidity} = body.current;
            fnCallback(undefined, 
                weather_descriptions + ". It is currently " +  temperature + " degrees out. It feels like " + 
                feelslike + " degrees. The humidity is " + humidity + "%.");        
        }

    });

}

module.exports = forecast;