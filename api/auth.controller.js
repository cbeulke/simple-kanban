const jwt = require('jsonwebtoken');
const Boom = require('boom');
const config = require('../config');
const mysql = require('mysql');

module.exports = function() {
    var connection = mysql.createConnection(config.database);

    var generateJWT = (id, username, scopes) => {
        return jwt.sign({
            _id: id,
            username: username,
            scope: scopes
        }, config.secret, {
            algorithm: 'HS256', expiresIn: '1h'
        });
    };
    
    
    return {
        login: (req, res) => {
            if(req.payload.username && req.payload.password) {
                connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [ req.payload.username, req.payload.password ], (err, result) => {
                    if(result.size > 0) {
                        return res({
                            token: generateJWT(result[0].id, result[0].username)
                        });     
                    }
                })
            }
            return res(Boom.unauthorized('invalid user'));
        },
        register: (req, res) => {
            if(req.payload.username && req.payload.password) {
                connection.query('INSERT INTO users SET ?', req.payload, (err, result) => {
                    return res(result);
                });
            } else {
                return res(Boom.badData('please provide username and password'));
            }
            
        }
    }
}();