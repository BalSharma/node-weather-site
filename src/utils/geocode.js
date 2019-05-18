const request = require('request');
const geocode = (address, callback) => {
    // this communicate with mapbox.com api. callback is called once
    // we have latitude & longitude.

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFsbWFwYm94IiwiYSI6ImNqdjAwYmltMzFlbTQ0M28wbDVvM2syYWwifQ.Jez12oJNIfY59mZvEc3PfA&limit=1';
    // 2nd agruments is a function to run when request complets. 
    request({ url, json: true }, (error, { body }) => {
        // what happens when request function is complete.
        if (error) {
            callback('Unable to connect location service!',
                undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find a location, search again.',
                undefined);
        }
        else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    });
}

module.exports = geocode;