const hbs = require('hbs');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { json, urlencoded } = require('body-parser');
const ApiRouter = require('../routes/api');
const ClientRouter = require('../routes/client');
const logger = require('./logger.config');
const constants = require('./constants.config');

global.logger = logger;
global.constants = constants;

// creates an express application
const app = express();

// define paths for static directories
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../templates');
const publicDirectoryPath = path.join(__dirname, '../public');

// setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// logs every request to the console
app.use(morgan(':date[iso] - :method - :url - :status - :response-time ms - :user-agent'));

// parsing application/json
app.use(json({ extended: false, limit: '50mb' }));

// parsing application/x-www-form-urlencoded
app.use(urlencoded({ extended: true, limit: '50mb' }));

// CORS controllers
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Expose-Headers", "Authorization"); // for webgl support
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(ClientRouter);
app.use(`/api/${constants.API_VERSION}`, ApiRouter);
app.use('*', (req, res) => { res.render('404', { title: 404, errorMessage: 'Page not found' }) });

module.exports = app;