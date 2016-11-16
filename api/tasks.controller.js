const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const config = require('../config');
const log = require('noogger');

module.exports = function() {
    var connection = mysql.createConnection(config.database);
    
    var getJwtPayload = (req) => {
    	return jwt.verify(req.headers.authorization.split(' ')[1], config.secret);	
    };

    return {
        saveNewTask: (req, res) => {
        	req.payload.userId = getJwtPayload(req)._id;
			connection.query('INSERT INTO tasks SET ?', req.payload, (err, result) => {
				if(err) {
					log.error(err);
					throw err;
				}
				res(result);
			});
		},
		selectAsColumns: (req, res) => {
			connection.query('SELECT * FROM tasks WHERE userId = ?', [ getJwtPayload(req)._id ], (err, tasks) => {
				if(err) {
					log.error(err);
					throw err;
				}

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
		},
		moveToColumn: (req, res) => {
			connection.query('UPDATE tasks SET status = ? WHERE id = ?', [req.payload.status, req.params.id], (err) => {
				if(err) {
					log.error(err);
					throw err;
				}
				res('success');
			});
		},
		remove: (req, res) => {
			connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
				if(err) {
					log.error(err);
					throw err;
				}
				res('success');
			});
		}
    };
}();