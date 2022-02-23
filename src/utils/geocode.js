const request = require("request");

const geocode = (address, fnCallback) => {
    const sURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +  encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGhpbGlwcHdpbSIsImEiOiJja3p3Y3VyaHcwMDk3Mm9vNHBmMmhuZmc0In0.arb8mEOS_8xRw_AyJcNG6Q";

    request( {url: sURL, json: true}, (error, {body}) => {
        if (error) {
            fnCallback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            fnCallback("No matching results were found for the location!", undefined);
        } else {
            const { features } = body;
            fnCallback(undefined, { lat: features[0].center[0], lon: features[0].center[1], location: features[0].place_name});
        }
    });
};

module.exports = geocode;