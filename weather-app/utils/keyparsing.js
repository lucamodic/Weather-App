const fs = require('fs')

const dataBuffer = fs.readFileSync('././keys.json')
const dataJSON = dataBuffer.toString()
const parsedData = JSON.parse(dataJSON)
const weatherstackKey = parsedData.weatherstackKey
const mapboxKey = parsedData.mapbox_key

module.exports = {
    mapboxKey: mapboxKey,
    weatherstackKey: weatherstackKey
}