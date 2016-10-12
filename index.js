const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
	port: 3000
});

var route = {
	path: '/',
	method: 'GET',
	handler: (req, res) => {
		res.file('index.html');
	}
};

server.register([ require('inert') ], (err) => {
	if(err) throw err;

	server.route(route);
	server.route({
		path: '/antonaustirol/{param*}',
		method: 'GET',
		handler: {
			directory: {
				path: 'node_modules'
			}
		}
	});	
});


server.start((err) => {
	if(err) throw err;
	console.log('server started...');
});