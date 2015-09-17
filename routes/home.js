var mongoose = require('mongoose');
var List = require('../model/list');
var Gift = require('../model/gift');

var async = require('async');

module.exports = function (app) {

	app.get('/', function (req, res) {
		var model = {
			user: req.user
		};
		if (req.user) {
			res.render('home', model);
		} else {
			res.render('index');
		}
	});

	function isLoggedIn(req, res, next) {
		if (req.user) {
			next();
		} else {
			res.redirect('/');
		}
	}

}
