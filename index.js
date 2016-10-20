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

server.register([ require('inert') ], (err) => {
	if(err) throw err;

	server.route({
		path: '/',
		method: 'GET',
		handler: (req, res) => {
			res.file('index.html');
		}
	});

	server.route({
		path: '/vendors/{param*}',
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

				var columns = [
					{listName: 'ToDo', columnStatus: 0, items: []},
					{listName: 'In Arbeit', columnStatus: 1, items: []},
					{listName: 'Erledigt', columnStatus: 2, items: []}
				];

				for (var i = tasks.length - 1; i >= 0; i--) {
					columns[tasks[i].status].items.push(tasks[i]);
				}

				res(columns);
			});
		}
	});

	server.route({
		path: '/tasks/{id}',
		method: 'PUT',
		handler: (req, res) => {
			connection.query('UPDATE tasks SET status = ? WHERE id = ?', [req.payload.status, req.params.id], (err) => {
				if(err) throw err;
				res('success');
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