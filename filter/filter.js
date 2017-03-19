var filter = {};
var User = require('../db/user');
filter.authorize = function(req, res, next) {
    if (req.session.user) {
        return next(req, res);
    }
    res.redirect('/userManger/login');
};
filter.login = function(req, res, next) {
    var name = req.body.username;
    var password = req.body.password;
    if(name != 'admin'){
        res.status('200');
        res.send({
            success: false,
            model: {
                error: '无管理员权限'
            }
        });
        return;
    }

    User.checkUser(name, password, function(err, user) {
        if (err) {
            res.status(500).send({
                success: false,
                model: {
                    error: '数据库错误'
                }
            });
        } else {
            if (user) {
                req.session.user = user;
                res.status(200).send({
                    success: true
                });
            } else {
                res.status(200).send({
                    success: false,
                    model: {
                        error: '用户名或密码错误'
                    }
                });
            }
        }
    });
};
filter.logout = function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.status(500).send({
                success: false,
                model: {
                    error: '注销失败'
                }
            });
        } else {
            res.status(200).send({
                success: true
            });
        }
    });
};
module.exports = filter;