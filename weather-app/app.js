const request = require('request')
const chalk = require('chalk')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const success = (msg) => console.log(chalk.green.bold.inverse(msg))
const failure = (msg) => console.log(chalk.red.bold.inverse(msg))

const location = process.argv[2]

if(!location){
    failure('Enter a location')
} else {
    geocode(location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return failure(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return failure(error)
            }
            success(location)
            success(forecastData)
        })
    })
}
