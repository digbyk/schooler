require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var db = require('./model');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	store: new RedisStore(),
	secret: 'SEKR37ly',
	saveUninitialized: true,
	resave: true
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(app, passport);

app.use(function (req, res, next) {
	res.status(404).send('Sorry cant find that!');
});

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.listen(port, host, function () {
	console.log("Listening on " + host + ":" + port)
});
