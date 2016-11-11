const Hapi = require('hapi');
const log = require('noogger');
const config = require('./config');

const server = new Hapi.Server();
server.connection({
	port: process.env.PORT || 3000
});

server.register([
		require('inert'),
		require('hapi-auth-jwt')
	], (err) => {
		if(err) {
			log.error(err);
			throw err;
		}
		
		server.auth.strategy('jwt', 'jwt', {
			key: config.secret,
			verifyOptions: { algorithms: [ 'HS256' ] }
		});
		
		server.register([
			require('./api/static.routes'),
			require('./api/tasks.routes'),
			require('./api/auth.routes')	
		]);
});

module.exports = server;