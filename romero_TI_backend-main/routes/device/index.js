var express = require('express');
var routerDevice = express.Router();
var pool = require('../../mysql');

//Devuelve un listado de dispositivos
//http://localhost:3002/api/device
routerDevice.get('/', function(req, res) {
    pool.query('Select * from device', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log("Error: no se pudo enviar el listado de dispositivos");
            return;
        }
        console.log("Se envió el listado de Dispositivos solicitados");
        res.send(result);
    }); 
});

module.exports = routerDevice;