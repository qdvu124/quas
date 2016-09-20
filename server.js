// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Book = require('./app/models/book');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 2302;        // set our port

var mongoose = require('mongoose');
// mongoose.connect('mongodb://quaan24:quaan24@ds033126.mlab.com:33126/quas-test'); // connect to our databas
mongoose.connect('mongodb://localhost/db')

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is being invoked');
    next(); // make sure we go to the next routes and don't stop here
});

router.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})

// test route to make sure everything is working (accessed at GET http://localhost:2302/api)
router.get('/', function (req, res) {
    res.json({ message: 'Quas, Wex, Exort ...' });
});

// on routes that end in /books
// ----------------------------------------------------
router.route('/books')

    .post(function (req, res) {

        var book = new Book();
        book.name = req.body.name;

        // save the book and check for errors
        book.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Book added!' });
        });

    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
