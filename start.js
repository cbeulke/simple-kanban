const server = require('./index');
const log = require('noogger');

server.start((err) => {
	if(err) throw err;
	log.info('Server running...');
});