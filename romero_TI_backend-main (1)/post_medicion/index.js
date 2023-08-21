var pool = require('../mysql');
var moment = require('moment');
const mqtt = require('mqtt')
const fs = require('fs')
const parseJson = require('json-parse-even-better-errors')

const { Command } = require('commander')

const program = new Command()
program
  .option('-p, --protocol <type>', 'connect protocol: mqtt, mqtts, ws, wss. default is mqtt', 'mqtt')
  .parse(process.argv)

const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
var dato;

// connect options
const OPTIONS = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'daiot',
    password: 'daiot',
    reconnectPeriod: 1000,
  }

  // protocol list
const PROTOCOLS = ['mqtt', 'mqtts', 'ws', 'wss']

// default is mqtt, unencrypted tcp connection
let connectUrl = `mqtt://${host}:${port}`
if (program.protocol && PROTOCOLS.indexOf(program.protocol) === -1) {
  console.log('protocol must one of mqtt, mqtts, ws, wss.')
} else if (program.protocol === 'mqtts') {
  // mqtts， encrypted tcp connection
  connectUrl = `mqtts://${host}:8883`
  OPTIONS['ca'] = fs.readFileSync('./broker.emqx.io-ca.crt')
} else if (program.protocol === 'ws') {
  // ws, unencrypted WebSocket connection
  const mountPath = '/mqtt' // mount path, connect emqx via WebSocket
  connectUrl = `ws://${host}:8083${mountPath}`
} else if (program.protocol === 'wss') {
  // wss, encrypted WebSocket connection
  const mountPath = '/mqtt' // mount path, connect emqx via WebSocket
  connectUrl = `wss://${host}:8084${mountPath}`
  OPTIONS['ca'] = fs.readFileSync('./broker.emqx.io-ca.crt')
} else {}

const topic = '/topic/dispositivos'

const client = mqtt.connect(connectUrl, OPTIONS)

client.on('connect', () => {
  console.log(`${program.protocol}: Connected`)
  client.subscribe([topic], () => {
    console.log(`${program.protocol}: Subscribe to topic '${topic}'`)
  })
  /*
  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
    
  })
  */
})

client.on('reconnect', (error) => {
  console.log(`Reconnecting(${program.protocol}):`, error)
})

client.on('error', (error) => {
  console.log(`Cannot connect(${program.protocol}):`, error)
})

client.on('message', (topic, payload) => {
    console.log('Received Message topic:', topic);
    console.log('Received Message payload:', payload.toString());
    const msg=payload.toString();
    // recuperación de variables
    let msg_json_parse=JSON.parse(msg);
    let valor=msg_json_parse.temperatura;
    let dispositivoId=parseInt(msg_json_parse.dev_id);
    let electroState=parseInt(msg_json_parse.electroState);
    
    var electroStateString="Abierta";
    if(electroState==1){
      electroStateString="Cerrada"
    }else{electroStateString="Abierta"};

    let electrovalvulaId=dispositivoId;
    let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    
    pool.query('Insert into Mediciones (fecha,valor,dispositivoId) values (?,?,?)', [fecha,valor, dispositivoId], function(err, result, fields) {
        if (err) {
            console.log("Error: no se pudo registrar la última medición del dispositivo ");
        return;
        }
        console.log("Se registró medición en el dispositivo: "+dispositivoId);
    });
    pool.query('Insert into Log_Riegos (apertura,fecha,electrovalvulaId) values (?,?,?)', [electroState, fecha, electrovalvulaId], function(err, result, fields) {
        if (err) {
            console.log("error: no se pudo realiazar el registro de Log ");
            return;
        }
        console.log("Estado de electroválvula: "+dispositivoId, electroStateString);
    });
    
})



