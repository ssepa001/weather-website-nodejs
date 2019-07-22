const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()


// Define paths for express configs
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sam Sepasi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sam Sepasi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'Help is here!',
        name: 'Sam Sepasi'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(address, (error, resp) => {
        if(error){
            return res.send({
                error: 'Geolocation: ' + error
            })
        }
        forecast(resp.latitude, resp.longitude, (error, forecast) => {
            if(error){
                return res.send({
                    error: 'WeatherApi: ' +  error
                })
            }
            res.send({
                forecast: forecast,
                location: resp.location,
                address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sam Sepasi',
        errorMsg: 'Help article not found.'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sam Sepasi',
        errorMsg: 'Page not found.'
    })
})

//start express server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})