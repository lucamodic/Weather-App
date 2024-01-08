const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Defining paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luca'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Luca'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help page',
        title: 'Help',
        name: 'Luca'
    })
})

//Request to look for a GET request
//Response to send info to the web
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid location'
        })
    }
    // Latitude, Longitude and location are all result.x
    // Result is the callback
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help article not found',
        title: 'Error 404',
        name: 'Luca'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Page not found',
        title: 'Error 404',
        name: 'Luca'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

