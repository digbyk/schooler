var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
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
