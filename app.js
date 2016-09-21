'use strict';

// CONFIG
// =============================================================================
var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('nconf');

require('dotenv').load();
config.use('memory');
config.argv();
config.env();

app.use(express.static('public'));
// configure app to use bodyParser() => allow get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);








var Book = require('./api/models/book')

// Books
router.route('/books')

    .post(function (req, res) {

        var book = new Book();
        book.name = req.body.name;
        book.edition = req.body.edition;
        book.author = req.body.author;
        book.publisher = req.body.publisher;

        // save the book and check for errors
        book.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Book added!' });
        });
    })

    .get(function (req, res) {
        Book.find(function (err, books) {
            if (err) {
                res.send(err);
            }

            res.json(books);
        });
    })
    ;

// Book
router.route('/books/:book_id')

    .get(function (req, res) {
        Book.findById(req.params.book_id, function (err, book) {
            if (err) {
                res.send(err);
            }
            res.json(book);
        });
    })

    .put(function (req, res) {

        Book.findById(req.params.book_id, function (err, book) {
            if (err) {
                res.send(err);
            }

            book.name = req.body.name;
            book.edition = (req.body.edition ? req.body.edition : 0);
            book.author = (req.body.author ? req.body.author : 'noone');
            book.publisher = (req.body.publisher ? req.body.publisher : 'them');

            book.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Book updated!' });
            });

        });
    })

    .delete(function (req, res) {
        Book.remove({
            _id: req.params.book_id
        }, function (err, book) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Book removed' });
        });
    });
;




// SETUP DATABASE
// =============================================================================
var mongoose = require('mongoose');
// mongoose.connect('mongodb://quaan24:quaan24@ds033126.mlab.com:33126/quas-test'); // connect to our database
mongoose.connect('mongodb://localhost/db')

// MIDDLEWARES
// =============================================================================
router.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})

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