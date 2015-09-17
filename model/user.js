var mongoose = require('mongoose');

// User
var userSchema = mongoose.Schema({
	name: String,
	email: String,
	gid: String,
	created: {
		type: Date,
		default: Date.now()
	},
	lastLoggedIn: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
