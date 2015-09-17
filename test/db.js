//var db = require('../model');
var User = require('../model/user');
var assert = require("assert");

describe('User', function () {
	before(function (done) {
		process.env.NODE_ENV = 'test';
		require('../model');
		done();
	});
	describe('#findOne()', function () {
		it('should findOne without error', function (done) {
			User.findOne({
				email: 'digby@digby.net'
			}, function (err, user) {
				if (err) return handleError(err);
				assert.equal('digby@digby.net', user.email);
				done();
			});
		});
	});
	describe('#find()', function () {
		it('should find without error', function (done) {
			User.find(function (err, users) {
				if (err) return handleError(err);
				assert.equal(2, users.length);
				done();
			});
		});
	});
});
