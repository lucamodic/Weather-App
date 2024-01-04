const request = require('request')
const keys = require('./keyparsing.js')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + keys.mapboxKey + "&limit=1"

    request({ url:url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
