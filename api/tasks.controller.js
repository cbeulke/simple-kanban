const mysql = require('mysql');
const config = require('../config');
const log = require('noogger');

module.exports = function() {
    var connection = mysql.createConnection(config.database);

    return {
        saveNewTask: (req, res) => {
			connection.query('INSERT INTO tasks SET ?', req.payload, (err, result) => {
				if(err) {
					log.error(err);
					throw err;
				}
				res(result);
			});
		},
		selectAsColumns: (req, res) => {
			connection.query('SELECT * FROM tasks', (err, tasks) => {
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