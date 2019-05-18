
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// create a variable to store express application
const app = express();

// defining path for express config
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
//create another path for partials
// we have to tell handlebars where we put partials.
const partialPath = path.join(__dirname, '../template/partials');

// Using hbs as the default view engine requires just one line of 
// code in app setup. This will render .hbs files when 
// res.render is called.

// setting up handlebars and views location
app.set('view engine', 'hbs');
// we are saying instead of root default 'views' folder user viewsPath
// to map custom folder.
app.set('views', viewsPath); // default path is views folder

// we have to register for partial path using handlebars module. 
hbs.registerPartials(partialPath);

// we serve with a single line. app.use customize server to serve up
// public folder. express.static is a function takse a path of folder.
// static directory set up
app.use(express.static(pubDir));

// We configure server by using various express methods as below.
// app.com (one domain with multiple routes below)
// app.com/home
// app.com/about

// get() method takes two arguments, 1st is route (url), 2nd
// argument is function (). Inside () function we describe what we want
// do when someone visits the particular route. In other word, when
// someone visits root level route what html render there. () function
// takes 2 arguments objects. 1st object req is about incoming request
// to the server 2nd is res (response) object that contains bunch of 
// methods allows us to customize what to send back to the requester. 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bal Sharma'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bal Sharma'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Bal K Sharma',
        msg: 'If you need help call me please.'
    });
})

app.get('/view', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: 'Must provide address.'
        });
    }
    else {
        geocode(req.query.address,
            (error, { latitude, longitude, location } = {}) => {
                if (error) {
                    // return console.log(error);
                    return res.send({
                        error: error
                    });
                }
                forecast(latitude, longitude,
                    (error, forecastData) => {
                        if (error) {
                            // return console.log('Error', error);
                            return res.send({
                                error: error
                            });
                        }
                        // Destructuring
                        // console.log(location)
                        // console.log(forecastDdata);
                        res.send({
                            location,
                            Data: forecastData,
                            address: req.query.address
                        });
                    });
            });
    }

    // res.send({
    //     location: 'Madison Heights',
    //     temp: 58,
    //     address: req.query.address
    // });
});

// if we want to add some search term add query string at the end of
// url with '?' key value pair additional information. if we want to add
// more then add '&' key value pair. 
app.get('/products', (req, res) => {
    // console.log(req.query); console.log(req.query.search);
    // console.log(req.query.rating);
    if (!req.query.search) {
        // res.send({
        return res.send({
            Error: 'Must provide search term.'
        });
    }
    // we are sending error twice. http request is a single request
    // that goes to the server and single response comes back. we are 
    // trying send res.send() twice. Cannot set headers after they
    // are sent to the client. if we add return at the top code that
    // solves the problem. Then we are stoping to send twice. Below code
    // does not run. We could have add else {..} block for success part.
    // But common practice is use return. 
    res.send({
        products: []
    });
});

// it is saying match everything /help as long as it was not matched
// previously. 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help article not found.',
        name: 'Bal K Sharma'
    });
});

// error page, it needs to be at the last one to use '*' wild card. 
// It means match anything that has not matched up above. 

app.get('*', (req, res) => {
    // res.send('404 Error.');
    res.render('404', {
        title: '404',
        msg: '404 page not found.',
        name: 'Bal K Sharma'
    });
});

// run server. devlopment port. 3000. This message never going to
// display on the browser. Useful piece of informaton for dev. It
// is up and running listening to incoming requests. Ctrl + C kills
// the process. 
app.listen(3000, () => {
    console.log('Server is up... @ 3000');
});
