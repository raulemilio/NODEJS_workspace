var mysql = require('mysql');
var configMysql = {
    connectionLimit: 10,
    host: '127.0.0.1', // ojo no poner localhost
    port: 3306,
    user: 'root',
    password: 'vtwqh7717',
    database: 'cenex_remotelabDB_mySQL'
}
var pool = mysql.createPool(configMysql);
pool.getConnection((err, connection) => {
    if (err) {
        console.log("error de conexión mysql");// para debug
        switch (err.code) {
            
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
        }
        if (connection) {
            connection.release();
        }
        return;
    }
});
module.exports = pool;