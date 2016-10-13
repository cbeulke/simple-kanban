const Hapi = require('hapi');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER 		|| 'nodeuser',
	password: process.env.DB_PASS 	|| 'nodepass',
	database: process.env.DB_NAME 	|| 'node'
});

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
	server.route({
		path: '/app/{param*}',
		method: 'GET',
		handler: {
			directory: {
				path: 'app'
			}
		}
	});
	server.route({
		path: '/tasks',
		method: 'POST',
		handler: (req, res) => {
			connection.query('INSERT INTO tasks SET ?', req.payload, (err, result) => {
				if(err) throw err;
				res(result);
			});
		}
	});

	server.route({
		path: '/tasks',
		method: 'GET',
		handler: (req, res) => {
			connection.query('SELECT * FROM tasks', (err, tasks) => {
				if(err) throw err;
				res(tasks);
			});
		}
	});

	server.route({
		path: '/tasks/{id}',
		method: 'DELETE',
		handler: (req, res) => {
			connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
				if(err) throw err;
				res('success');
			});
		}
	});
});

module.exports = server;