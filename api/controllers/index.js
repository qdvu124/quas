'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', require('../middlewares/cors'));
router.use('/books', require('./books'));

router.get('/about', function (req, res) {
    res.send('Learn about us')
})

router.route('/docs')
    .get(function (req, res) {
        res.sendFile(path.resolve('public/swagger-ui.html'));
    });

module.exports = router;