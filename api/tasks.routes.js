const controller = require('./tasks.controller');

exports.register = function(server, options, next) {
    server.route({
		path: '/tasks',
		method: 'POST',
		handler: controller.saveNewTask
	});

	server.route({
		path: '/tasks',
		method: 'GET',
		handler: controller.selectAsColumns
	});

	server.route({
		path: '/tasks/{id}',
		method: 'PUT',
		handler: controller.moveToColumn
	});

	server.route({
		path: '/tasks/{id}',
		method: 'DELETE',
		handler: controller.remove
	});
	
	next();
};

exports.register.attributes = {
    name: 'routes/tasks'
};