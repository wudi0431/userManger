var express = require('express');
var router = express.Router();
var User = require('../db/user');
var filter = require('../filter/filter');


router.post('/', function (req, res) {
    filter.authorize(req, res, function (req, res) {
        var userEntity = new User({
            name: req.body.username,
            password: req.body.password
        });
        userEntity.save(function (err, userEntity) {
            if (err) {
                res.status(500).send({
                    success: false,
                    model: {
                        error: '数据库错误'
                    }
                });
            } else {
                if (userEntity) {
                    res.status(200).send({
                        success: true
                    });
                } else {
                    res.status(200).send({
                        success: false,
                        model: {
                            error: '数据库错误'
                        }
                    });
                }
            }
        });

    });

});


module.exports = router;