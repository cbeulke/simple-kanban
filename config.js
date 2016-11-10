module.exports = {
    database: {
        host: process.env.DB_HOST		|| 'localhost',
    	user: process.env.DB_USER 		|| 'nodeuser',
    	password: process.env.DB_PASS 	|| 'nodepass',
    	database: process.env.DB_NAME 	|| 'node'
    }
}