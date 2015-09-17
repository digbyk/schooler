var mongoose = require('mongoose');
var List = mongoose.model('List');
var Gift = mongoose.model('Gift');

var async = require('async');

module.exports = function (app) {

	app.get('/lists', isLoggedIn, function (req, res) {
		List.find({
			owner: req.user._id
		}, function (err, myLists) {
			List.find({
				members: req.user._id
			}, function (err, inLists) {
				res.render('lists', {
					user: req.user,
					myLists: myLists,
					inLists: inLists
				});
			});
		});
	});

	app.get('/list/new', isLoggedIn, function (req, res) {
		var model = {
			user: req.user
		};
		res.render('list/new', model);
	});

	app.post('/list/new', isLoggedIn, function (req, res) {
		var list = {};
		list.name = req.body.name;
		list.type = req.body.type;
		list.owner = req.user._id;
		list.members = [req.user._id];
		list.joinId = new mongoose.Types.ObjectId;
		list.notes = req.body.notes;

		List.create(list, function (err, user) {
			if (err) {
				console.log(err);
				return res.redirect('/lists?error=deleting');
			}
			console.log("list created and saved: " + list);
			res.redirect('/lists');
		});
	});

	app.get('/list/delete/:listId', isLoggedIn, function (req, res) {
		// Need to add "are you sure" page and owner validation
		List.findOneAndRemove({
				_id: req.params.listId,
				owner: req.user._id
			},
			function (err, list) {
				if (err) {
					console.log(err);
					return res.redirect('/lists?error=deleting');
				}
				console.log("List deleted:", list);
				res.redirect('/lists');
			}
		);
	});

	app.get('/list/edit/:listId', isLoggedIn, function (req, res) {
		var model = {};
		async.parallel(
			[

			function (callback) {
					List.findOne({
						_id: req.params.listId
					}, function (err, list) {
						model.list = list;
						callback();
					});
			}
			], function (err) {
				if (err) return next(err);
				res.render('list/edit', model);
			});
	});

	app.get('/list/view/:listId', isLoggedIn, function (req, res) {
		var model = {};
		async.parallel(
			[

			function (callback) {
					List.findOne({
						_id: req.params.listId
					}).populate('owner members', 'name').exec(function (err, list) {
						console.log(list);
						model.list = list;
						callback();
					});
			}
			], function (err) {
				if (err) return next(err);
				res.render('list/view', model);
			});
	});

	app.get('/list/:listId/:listName?', isLoggedIn, function (req, res) {
		var model = {
			user: req.user
		};
		async.parallel(
			[

			function (callback) {
					List.findOne({
						_id: req.params.listId
					}, function (err, list) {
						model.list = list;
						callback();
					});
			},
			function (callback) {
					Gift.find({
						list: req.params.listId
					}, function (err, gifts) {
						model.gifts = gifts;
						callback();
					});
			}

			], function (err) {
				if (err) return next(err);
				res.render('list', model);
			});
	});


	function isLoggedIn(req, res, next) {
		if (req.user) {
			next();
		} else {
			res.redirect('/');
		}
	}

}
