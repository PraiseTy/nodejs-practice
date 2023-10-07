const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define path for Express config
publicDirectoryPath = path.join(__dirname, '../public')
viewPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars for engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Praise Toyosi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Praise Toyosi'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help',
        body: 'If you have any questions',
        name: 'Praise Toyosi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })

    console.log(req.query.search)
    res.send({
        products: []
    })
    }
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: "Praise Toyosi"
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: "Praise Toyosi"
    })
})
app.listen(3000, () =>{
    console.log('Server is up on port 3000. ')
})