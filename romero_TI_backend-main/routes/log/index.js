var express = require('express');
var routerLog = express.Router();
var pool = require('../../mysql');
var valvulaAperturaCierre=0; //Con esta variable simulo que se realizó una acción sobre la electrovalvula

//Espera recibir por parámetro un id de dispositivo y devuelve su último log
routerLog.get('/:id_device', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaid=? order by fecha desc', [req.params.idElectrovalvula], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log("Error: no se pudo enviar el último log para la electroválvula "+req.params.idElectrovalvula);
            return;
        }
        console.log("Se envió el último log para la electroválvula "+req.params.idElectrovalvula);
        res.send(result[0]);
    });
});

//Espera recibir por parámetro un id de dispositivo y devuelve todos sus logs
routerLog.get('/:id_device/todos', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaid=? order by fecha desc', [req.params.id_device], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log("Error: no se pudo enviar al cliente el listado de Log para electroválvula "+req.params.id_device);
            return;
        }
        console.log("Se envía al cliente el listado de logs de electroválvula "+req.params.id_device);
        res.send(result);
    });
});

module.exports = routerLog;