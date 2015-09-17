var mongoose = require('mongoose');

// Gift
var giftSchema = mongoose.Schema({
	name: String,
	url: String,
	imageUrl: String,
	count: Number,
	notes: String,
	list: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'List'
	},
	enteredBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	enteredFor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	boughtBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

var Gift = mongoose.model('Gift', giftSchema);

module.exports = Gift;
