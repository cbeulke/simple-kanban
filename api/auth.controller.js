const jwt = require('jsonwebtoken');
const Boom = require('boom');
const config = require('../config');

module.exports = function() {
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
            if(req.payload.username === 'user') {
                return res({
                    token: generateJWT(1, 'user')
                });
            }
            return res(Boom.unauthorized('invalid user'));
        },
        register: (req, res) => {
            res(Boom.notImplemented());
        }
    }
}();