var conf = require('nconf');
conf.argv()
	.env()
	.file({
		file: './config.json'
	});
var url = conf.get('db:url');
console.log(url);

var mongoose = require('mongoose');

mongoose.connect(url, {
	server: {
		auto_reconnect: true
	}
});

// That's the main bits done

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected');
});

mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
	mongoose.connect(url, {
		server: {
			auto_reconnect: true
		}
	});
});

mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});
