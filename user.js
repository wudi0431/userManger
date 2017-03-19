var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var conifg = require('./config');
var multipart = require('connect-multiparty');


var mongoose = require('mongoose');
if (conifg.NODE_ENV == 'dev') {
    mongoose.connect('mongodb://passport:passport@192.168.112.94:27017/passport');
} else {
    mongoose.connect('mongodb://127.0.0.1:27017/passport');
}


var MongoStore = require('connect-mongo')(session);
var app = express();

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'passportsession',
    key: 'mxc',//cookie name
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(multipart());

var ejs = require('ejs');


// view engine setup
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var index = require('./routes/index');
var login = require('./routes/login');
var addUser = require('./routes/addUser');


app.use('/', index);
app.use('/login', login);
app.use('/addUser', addUser);


module.exports = app;