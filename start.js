const server = require('./index');
server.start((err) => {
	if(err) throw err;
	console.log('Server running...');
});