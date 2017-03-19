var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String
});

UserSchema.static('checkUser', function (name, password, cb) {
    return this.findOne({
        name: name,
        password: password
    }, cb)
});

UserSchema.static('getUserList', function (cb) {
    return this.find().exec(cb);
});


var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;