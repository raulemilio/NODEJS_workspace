var express = require('express');
var routerPostDevice = express.Router();
const client = require('../../mqtt');
var pool = require('../../mysql');
//para lr1
const topic='cenex/lr1/post_value_device';

function mqttPublishMessage(topic, message) {
  console.log(`Sending Topic post: ${topic}, Message: ${message}`);
  client.publish(topic, message, {
    qos: 0,
    retain: false,
  });
}
/*
// post device lr1 (ojo deberia ser un post pero por motivos de seguridad no pude hacerlo andar con post)
routerPostDevice.post('/lr1_device', (req, res) => {
    let data = req.body;
    console.log("Device:datos recibidos metodo post: "+JSON.stringify(data));
    // msg de verificación
    res.send('Data Received device1: ' + JSON.stringify(data));

    mqttPublishMessage(topic, JSON.stringify(data));
});
*/

// post device lr1 (ojo deberia ser un post pero por motivos de seguridad no pude hacerlo andar con post)
routerPostDevice.get('/lr1_device/', (req, res) => {
  let data=req.query.data;
  console.log("Device:datos recibidos metodo post: "+data);
  // msg de verificación
  res.send('Data Received device1:');

  mqttPublishMessage(topic, data);
});
// post device lr1 (ojo deberia ser un post pero por motivos de seguridad no pude hacerlo andar con post)
routerPostDevice.get('/buffer_clean', (req, res) => {
  let data=req.query.data;
  console.log("Device:datos recibidos metodo post: "+data);
  // msg de verificación
  res.send('Data Received device1:');
  
  pool.query('Delete from lr1_registro',function(err, result) {
    if (err) {
      console.log("Error: no se pudo borrar buffer en DB ");
    return;
    }
  console.log("Se borró correctamente el buffer en DB");
  });
  
});
//DELETE FROM cenex_remotelabDB_mySQL.lr1_registro;
module.exports = routerPostDevice;