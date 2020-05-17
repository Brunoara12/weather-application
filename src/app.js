const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bruno Rebaza'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bruno Rebaza'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bruno Rebaza',
        message: 'This is a help Message'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
            {
                return res.send({
                    error: error
                })
            }
    
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            console.log(location, '. It is ' + forecastData)
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Bruno Rebaza'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Bruno Rebaza'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})