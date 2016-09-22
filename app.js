'use strict';

// CONFIG
// =============================================================================
var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('nconf');
var router = require('./api/controllers');

require('dotenv').load();
config.use('memory');
config.argv();
config.env();

app.use(express.static('public'));
// configure app to use bodyParser() => allow get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// SETUP DATABASE
// =============================================================================
var mongoose = require('mongoose');
// mongoose.connect('mongodb://quaan24:quaan24@ds033126.mlab.com:33126/quas-test'); // connect to our database
mongoose.connect('mongodb://localhost/db');



// // MIDDLEWARES
// // =============================================================================
// router.all('/', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// })

// ROUTES FOR OUR API
// =============================================================================
router.route('/docs')
    .get(function (req, res) {
        res.sendFile(__dirname + '/public/swagger-ui.html');
    });

SwaggerExpress.create({
    appRoot: __dirname
}, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }
    swaggerExpress.register(app);
    app.listen(config.get('NODE_PORT'));
});

module.exports = app;
