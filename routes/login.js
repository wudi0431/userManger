var express = require('express');
var router = express.Router();
var filter = require('../filter/filter');

// Define user login routes
router.get('/', function (req, res) {
    if (req.session.user) {
        res.redirect('/userManger');
    } else {
        res.render('login');
    }
});

router.post('/', function (req, res, next) {
    filter.login(req, res, next);
});


module.exports = router;