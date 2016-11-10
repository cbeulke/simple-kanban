const Hapi = require('hapi');
const log = require('noogger');

const server = new Hapi.Server();
server.connection({
	port: process.env.PORT || 3000
});

server.register([
		require('inert'),
		require('./api/static.routes'),
		require('./api/tasks.routes')
	], (err) => {
		if(err) {
			log.error(err);
			throw err;
		}
});

module.exports = server;