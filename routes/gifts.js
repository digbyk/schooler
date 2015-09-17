var mongoose = require('mongoose');
var List = mongoose.model('List');
var Gift = mongoose.model('Gift');

module.exports = function (app) {

	app.get('/gifts', function (req, res) {
		if (req.user) {
			Gift.find().populate('enteredBy boughtBy', 'name').exec(function (err, gifts) {
				res.render('gifts', {
					user: req.user,
					gifts: gifts
				});
			});
		} else {
			res.redirect('/');
		}
	});

	app.get('/gifts/:giftId', function (req, res) {
		if (req.user) {
			console.log(req.params.eventId);
			Gift.find({
				'name': 'Banana' //req.params.eventId
			}).populate('enteredBy boughtBy', 'name').exec(function (err, gifts) {
				res.render('gifts', {
					gifts: gifts
				});
			});
		} else {
			res.redirect('/');
		}
	});

}
