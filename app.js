'use strict';

// CONFIG
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('nconf');
var router = require('./api/controllers');

require('dotenv').load();
config.use('memory')
    .argv()
    .env();

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

// RUN APP
// =============================================================================

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
SwaggerExpress.create({ appRoot: __dirname }, function(err, swaggerExpress) {
  if (err) { throw err; }
  // Add swagger-ui (This must be before swaggerExpress.register)
  app.use(SwaggerUi(swaggerExpress.runner.swagger, { apiDocs: '/api/api-docs', swaggerUi: '/api/docs' }));
  // Install middleware
  swaggerExpress.register(app);
});

app.listen(config.get('NODE_PORT'));
module.exports = app;
