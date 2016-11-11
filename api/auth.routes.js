const controller = require('./auth.controller');

exports.register = function(server, options, next) {
    server.route({
		path: '/auth/login',
		method: 'POST',
		handler: controller.login
	});

	server.route({
		path: '/auth/register',
		method: 'POST',
		handler: controller.register
	});
	
	next();
};

exports.register.attributes = {
    name: 'routes/auth'
};