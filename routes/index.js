module.exports = function (app, passport) {

	app.get('/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email', 'https://www.googleapis.com/auth/plus.login']
		}),
		function (req, res) {
			// The request will be redirected to Google for authentication, so this
			// function will not be called.
		});

	app.get('/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/login'
		}),
		function (req, res) {
			res.redirect('/');
		});

	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/', function (req, res) {
		if (req.user) {
			res.render('home', {
				user: req.user
			});
		} else {
			res.render('index');
		}
	});

};
