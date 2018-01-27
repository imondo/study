const mysql = require('mysql');
const config = require('./../config/defalut');
const connection = mysql.createConnection(config);
connection.connect();

module.exports = connection;