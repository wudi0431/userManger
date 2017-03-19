var express = require('express');
var router = express.Router();
var User = require('../db/user');
var filter = require('../filter/filter');


router.get('/', function (req, res) {
    filter.authorize(req, res, function (req, res) {
        var userList = [];
        User.getUserList(function (err, userListEntity) {
            if (userListEntity) {
                userList = filterUserList(userListEntity);
            }
            res.render('index', {
                userList:userList
            });
        });

    });

});


function filterUserList(userList) {
    userList = userList.filter(function (user) {
        return user.name != 'admin';
    });
    userList = userList.map(function (user) {
        return mixObject(user);
    });
    return userList;
}

function mixObject(obj) {
    var tmpObj = {};
    for (var key in obj) {
        if (type(obj[key]) == 'date' || type(obj[key]) == 'string' || type(obj[key]) == 'number' || type(obj[key]) == 'array') {
            tmpObj[key] = obj[key];
        }
    }
    delete tmpObj.password;
    return tmpObj;
}

function type(o) {
    var TYPES = {
        'undefined': 'undefined',
        'number': 'number',
        'boolean': 'boolean',
        'string': 'string',
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Function]': 'function',
        '[object RegExp]': 'regexp',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Error]': 'error'
    };

    var TOSTRING = Object.prototype.toString;
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
}

module.exports = router;