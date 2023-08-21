var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');

//Devuelve un array de dispositivos
routerDispositivo.get('/', function(req, res) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log("Error: no se pudo enviar el listado de dispositivos al cliente");
            return;
        }
        console.log("Se envió el listado de Dispositivos solicitado por el cliente");
        res.send(result);
    });
});

module.exports = routerDispositivo;