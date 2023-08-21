var express = require('express');
var routerLog = express.Router();
var pool = require('../../mysql');
var valvulaAperturaCierre=0; //Con esta variable simulo que se realizó una acción sobre la electrovalvula

//Espera recibir por parámetro un id de dispositivo y devuelve su último log
routerLog.get('/:idElectrovalvula', function(req, res) {
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

//Espera recibir por parámetro un id de electroválvula y devuelve todos sus logs
routerLog.get('/:idElectrovalvula/todas', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaid=? order by fecha desc', [req.params.idElectrovalvula], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log("Error: no se pudo enviar al cliente el listado de Log para electroválvula "+req.params.idElectrovalvula);
            return;
        }
        console.log("Se envía al cliente el listado de logs de electroválvula "+req.params.idElectrovalvula);
        res.send(result);
    });
});

//Espera recibir por parámetro un id de electrovalvula y un estado de apertura/cierre y lo inserta en base de datos.
routerLog.post('/agregar', function(req, res) {
    // en un caso real se devería llamar a una función que verifique que realmente la electroválvula se cerro o abrió
    valvulaAperturaCierre=req.body.apertura;
    /*
    pool.query('Insert into Log_Riegos (apertura,fecha,electrovalvulaId) values (?,?,?)', [valvulaAperturaCierre, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log("error: no se pudo realiazar el registro de Log "+req.body.electrovalvulaId);
            return;
        }
        console.log("El Cliente cerró la electroválvula, se agrega log para electroválvula "+req.body.electrovalvulaId);
        res.send(result);
    });
    */
});

module.exports = routerLog;