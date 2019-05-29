//
// Goal: Add new data to forecast
//
// 1. Update forecast string to include new data
// 2. Commit changes
// 3. push changes to github & heroku
// 4. Test changes to local & live application.

const request = require('request');

const forecast = (lat, long, callback) => {
    const url =
        'https://api.darksky.net/forecast/a9dfdc52cd923d95fe3b5bbf295dbaeb/' + lat + ',' + long;

    // request({ url: url, json: true }, (err, response) => {
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect weather service.', undefined);
        }
        // else if (response.body.error) {
        else if (body.error) {
            //else if (error) {
            callback('Location Not Found!', undefined);
        }
        else {
            const data = {
                // current: 'It is currently ' + temperature + ' degree out.',
                // rain: 'Chance of rain ' + precipProbability + '%'
                current: 'It is currently ' + body.currently.temperature + ' degree out.',
                rain: 'Chance of rain ' + body.currently.precipProbability + '%'
                // current: 'It is currently ' + response.body.currently.temperature + ' degree out.',
                // rain: 'Chance of rain ' + response.body.currently.precipProbability + '%'
            }
            callback(undefined, data);
        }
    });
};
module.exports = forecast;