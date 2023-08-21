var pool = require('../mysql'); // esta variable esta en el archivo de mysql, es una forma de hacer global
const fs = require('fs');
const influx = require('../influxdb');
const { Command } = require('commander');
var client = require('../mqtt');

//topic para lr1
const topic_data_device= 'cenex/lr1/data_device' 
const topic_log_device = 'cenex/lr1/log_device'
const lr_id_check=1
const offset=2700;// offset de los datos
//Influx
const measurement_name="log_device";

// aca topic es una variable interna, no tiene nada que ver con los topic subscriptos
client.on('message', (topic, payload) => {
    console.log('Received Message topic:', topic);
    console.log('Received Message payload:', payload.toString());
    const msg=payload.toString();
    let msg_json_parse=JSON.parse(msg);
    
    if(topic===topic_data_device){
      console.log('Recive data topic device:',topic);
      let dev_id=msg_json_parse.dev_id;
      console.log('dev_id:',dev_id);
      //Para cada LR hay que escribir un if diferente
      // recibimos datos del sensor de voltaj
      if(dev_id==lr_id_check){
        let registro=msg_json_parse.voltaje;
          for (var i = 0; i < (registro.length-1); i++) {
          console.log('data sensor:',registro[i]);
          pool.query('Insert into lr1_registro (buffer) values (?)', [registro[i]], function(err, result, fields) {
            if (err) {
              console.log("Error: no se pudo cargar el dato en DB ");
            return;
            }
          console.log("Se registró correctamente el valor medido");
          });
          }
      }
    }
    
    // recibidos datos de todos los LR en cenex en este caso
    if(topic===topic_log_device){
      console.log('Revice data topic log:',topic);
      let lr_id=msg_json_parse.lr_id;
      let dev_id=msg_json_parse.dev_id;
      let state=msg_json_parse.state;
  
      console.log('log lr_id:',lr_id);
      console.log('log dev_id:',dev_id);
      console.log('log state:',state);
        
      // guardamos en influx
        influx
          .writePoints([
            {
              measurement: measurement_name,
              tags: { lr_id: lr_id},
              fields: { dev_id:dev_id, state:state },
            },
          ])
          .catch((err) => {
            console.error(`Error saving data to InfluxDB! ${err.stack}`);
          });
    } 
});

