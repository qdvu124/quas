'use strict';

var express = require('express')
var router = express.Router()
var Book = require('../models/book');

router.route('/:book_id')

    .get(function(req, res) {
        Book.findById(req.params.book_id, function(err, book) {
            if (err) {
                res.send(err);
            }
            res.json(book);
        });
    })

    .put(function(req, res) {
        Book.findById(req.params.book_id, function(err, book) {
            if (err) {
                res.send(err);
            }
            book.name = req.body.name;
            book.edition = (req.body.edition ? req.body.edition : 0);
            book.author = (req.body.author ? req.body.author : 'noone');
            book.publisher = (req.body.publisher ? req.body.publisher : 'them');
            book.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Book updated!' });
            });
        });
    })

    .delete(function(req, res) {
        Book.remove({
            _id: req.params.book_id
        }, function(err, book) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Book removed' });
        });
    })
;

router.route('/')

    .get(function (req, res) {
        Book.find(function (err, books) {
            if (err) {
                res.send(err);
            }
            res.json(books);
        });
    })

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
;

module.exports = router