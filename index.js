const Hapi = require('hapi');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	database: 'simple-kanban',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || 'secret123'
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


server.start((err) => {
	if(err) throw err;
	console.log('server started...');
});