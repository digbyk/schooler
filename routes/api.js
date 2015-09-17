var mongoose = require('mongoose');
var List = require('../model/list');
var Gift = require('../model/gift');

var async = require('async');

module.exports = function (app) {

	app.get('/api/lists', isLoggedIn, function (req, res) {
		var model = {
			user: req.user
		};
		List.find({
			owner: req.user._id
		}, function (err, lists) {
			if (err) return next(err);
			res.send(lists);
		});

	});

	app.get('/api/lists/:listId', isLoggedIn, function (req, res) {
		var model = {
			user: req.user
		};
		List.findOne({
			owner: req.user._id,
			_id: req.params.listId
		}, function (err, list) {
			if (err) return next(err);
			res.send(list);
		});

	});

	app.post('/api/lists', isLoggedIn, function (req, res) {
		var model = {
			user: req.user
		};
		var list = new List();
		list.name = req.body.name;
		list.owner = req.user._id;
		list.members[0] = req.user._id;
		console.log(req.body.name);
		list.save(function (err) {
			if (err) return next(err);
		});

	});

	function isLoggedIn(req, res, next) {
		if (req.user) {
			next();
		} else {
			res.send({});
		}
	}

}
