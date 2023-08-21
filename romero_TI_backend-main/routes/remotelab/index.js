var express = require('express');
var routerRemoteLab = express.Router();
var pool = require('../../mysql');

//Devuelve un listado de dispositivos
//http://localhost:3002/api/remotelab
routerRemoteLab.get('/', function(req, res) {
    pool.query('Select * from remotelab', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log("Error: no se pudo enviar el listado de dispositivos");
            return;
        }
        console.log("Se envió el listado de Dispositivos solicitados");
        res.send(result);
    }); 
});

module.exports = routerRemoteLab;