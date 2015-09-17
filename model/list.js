var mongoose = require('mongoose');

// 	List
var listSchema = mongoose.Schema({
	name: String,
	type: String,
	open: Boolean,
	notes: String,
	joinId: mongoose.Schema.Types.ObjectId,
	created: {
		type: Date,
		default: Date.now()
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

var List = mongoose.model('List', listSchema);

module.exports = List;
