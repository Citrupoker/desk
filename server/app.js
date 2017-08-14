
require('dotenv').config();
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();
var middleware  = require('./libs/middleware.js')

var index = require('./routes/index');
var users = require('./routes/users');

mongoose.connect(process.env.MONGODB_URI);

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(middleware.middleware404);

// error handler
app.use(middleware.middlewareError);

module.exports = app;
