const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { response } = require('express');

// require local files
const geoLocApi = require('./utils/geoLocApi');
const weatherGeoLocApi = require('./utils/weatherGeoLocApi');

const app = express();

// define path for Express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static location to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        author: 'Rodrigo G. Katz',
        menu: {
            home: {
                path: "/",
                pathName: "Home"
            },
            about: {
                path: "/about",
                pathName: "About Me"
            },
            help: {
                path: "/help",
                pathName: "Help"
            }
        }
    });
});

app.get('/weather', (request, response) => {
    if(!request.query.address){
        response.send(
            {
                error: "Address must be provided"
            }
        );
    } else {
        
        geoLocApi(request.query.address, request.query.units, (error, {latitude, longitude, country, region} = {})=>{
            if(error){
                response.send(
                    {
                        error : error
                    }
                );
            } else {
                var latAndLon =  String(latitude)+","+String(longitude);
                weatherGeoLocApi(latAndLon, request.query.units, (error, forecastData)=>{
                    if(error){
                        response.send(
                            {
                                error : error
                            }
                        );
                    } else {
                        response.send(
                            {
                                country: country,
                                region: region,
                                forecast: forecastData
                            }
                        );
                    }
                });
            }
        });

        //response.send(
        //    {
        //        location: 'Capital federal',
        //        forecast: 'es un dia peronista',
        //        address: request.query.address
        //    }
        //);
    }
    
});

app.get("/products", (request, response)=>{
    if(!request.query.search){
        response.send({
            error: "You must provide a search item"
        });
    } else {
        console.log(request.query.search);
        response.send({
            products: []
        });
    }
    
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        names: 'Rodrigo German',
        lastname: 'Katz',
        birthDate: 'oct 14, 1988',
        age: 34,
        email: 'rodrigokatztest@gmail.com',
        whatIDo: 'QA at day, Developer at night',
        description: "I consider myself as a responsible and organized person. I try to do my job as efficiently as possible with the flexibility and initiative required to fulfill any given objective",
        arnold: "Arnold_2022-12-26_at_9.42.09_AM",
        author: 'Rodrigo G. Katz',
        menu: {
            home: {
                path: "/",
                pathName: "Home"
            },
            about: {
                path: "/about",
                pathName: "About Me"
            },
            help: {
                path: "/help",
                pathName: "Help"
            }
        }
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        locationDescription: "For location you can use latitude and longitude separated by commas without spaces in between like this example '-34.607357,-58.454595', or you can use the name of the location whether if it is a country, region, location like these examples 'argentina', 'capital federal', 'chaco'",
        unitDescription: "For units you need to choose between just 'm' or 'f' or 's'. M stands for (M)etric. F stands for (F)ahrenheit. S stands for  (S)cientific",
        otherDescription: "If you have any other question do not hesitate to contact the administrator",
        author: 'Rodrigo G. Katz',
        menu: {
            home: {
                path: "/",
                pathName: "Home"
            },
            about: {
                path: "/about",
                pathName: "About Me"
            },
            help: {
                path: "/help",
                pathName: "Help"
            }
        }
    });
});

app.get("/help/*", (request, response) => {
    response.render('error',{
        title: 'Help article not found',
        description: "The help article you are trying to reach does not exist",
        author: 'Rodrigo G. Katz',
        menu: {
            home: {
                path: "/",
                pathName: "Home"
            },
            about: {
                path: "/about",
                pathName: "About Me"
            },
            help: {
                path: "/help",
                pathName: "Help"
            }
        }
    });  
});

app.get("*", (request, response) => {
    response.render('error',{
        title: '404 Page not found',
        description: "The page you are trying to reach does not exist",
        author: 'Rodrigo G. Katz',
        menu: {
            home: {
                path: "/",
                pathName: "Home"
            },
            about: {
                path: "/about",
                pathName: "About Me"
            },
            help: {
                path: "/help",
                pathName: "Help"
            }
        }
    });  
});

/*app.get('', (request, response) => {
    response.send('<h1>Weather app</h1>');
});

app.get('/family', (request, response) => {
    response.send(
        [
            {
                name: 'Rodrigo',
                lastname: 'Katz',
                age: 34
            },
            {
                name: 'Arnold',
                lastname: 'Katz',
                age: 4
            },
        ]
    );
});

app.get('/rodrigo', (request, response) => {
    response.send('<h1>About</h1>');
});

*/


app.listen(3000, () => {
    console.log("application running on http://localhost:3000");
});