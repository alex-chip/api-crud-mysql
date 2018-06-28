const mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOptions = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: 3306,
        database: 'movies'
    },
    Movies = myConnection(mysql, dbOptions, 'request')

module.exports = Movies
