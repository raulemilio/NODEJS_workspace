var mysql = require('mysql');
var configMysql = {
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'vtwqh7717',
    database: 'DAM'
}
var pool = mysql.createPool(configMysql);
pool.getConnection((err, connection) => {
    if (err) {
        console.log("error de conexión");// para debug
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