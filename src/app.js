const path = require('path')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

//DEfine paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialDirPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialDirPath);


//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res)=>
{
    res.render('index', {
        title: 'Weather App',
        name: 'Dwipika Konduru'
    });
});
app.get('/about', (req, res)=>
{
    res.render('about', {
        title: 'About Me',
        name: 'Dwipika Konduru'
    });
});

app.get('/help', (req, res)=>
{
    res.render('help', {
        title: 'Help Page',
        name: 'Dwipika Konduru',
        helpText: 'This is some helpful text'
    })
});
app.get('/weather', (req,res)=>{
    if(!req.query.address)
    {
        return res.send(
            {
                error: "You must provide the address",
            }
        )
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) =>
    {
        if(error) {return res.send({error});}
  
        forecast(latitude, longitude, (error, forecastData)=>{

            if(error) {return res.send({error});}
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address,
            });
        });
    });
});
app.get('/help/*', (req, res)=>
{
    res.render('error', {
        title: '404',
        name:'Dwipika Konduru',
        errorMessage: 'Help page not found'
    })
});
app.get('*', (req, res)=>
{
    res.render('error',{
        title: '404',
        name:'Dwipika Konduru',
        errorMessage: 'Page not found'
    })
});
app.listen(port, ()=>
{
    console.log("Server is up on port " + port);
})
