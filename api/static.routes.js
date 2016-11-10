const controller = require('./static.controller');

exports.register = function(server, options, next) {
    server.route({
		path: '/',
		method: 'GET',
		handler: controller.serveMainPage
	});

	server.route({
		path: '/vendors/{param*}',
		method: 'GET',
		handler: controller.serveVendorModules
	});	
	server.route({
		path: '/app/{param*}',
		method: 'GET',
		handler: controller.serveClientApp
	});
	next();
};

exports.register.attributes = {
    name: 'routes/static'
};