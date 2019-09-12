/*
 * @Author: 寒嫣
 * @Date: 2019-08-28 15:22:28
 * @Description: file content
 */
const mysql = require('mysql')

function createConnection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'bfj123456',
        database: 'test'
    });
    return connection;
}
module.exports = {
    createConnection
}