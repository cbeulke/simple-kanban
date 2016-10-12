const http = require('http');
const fs = require('fs');

const requestHandler = function(req, res) {
	fs.readFile('index.html', (err, file) => {
		res.end(file);
	});
};

const server = http.createServer(requestHandler);

server.listen(3000);