const mqtt = require('mqtt');
const fs = require('fs')
const { Command } = require('commander')

//topic para lr1
const topic_data_device= 'cenex/lr1/data_device' 
const topic_log_device = 'cenex/lr1/log_device'

const program = new Command()
program
  .option('-p, --protocol <type>', 'connect protocol: mqtt, mqtts, ws, wss. default is mqtt', 'mqtt')
  .parse(process.argv)

const host = 'mqtt.eclipseprojects.io'
//const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

// connect options
const OPTIONS = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: '',
    password: '',
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


const client = mqtt.connect(connectUrl, OPTIONS)

client.on('connect', () => {
    console.log(`${program.protocol}: Connected`)
    // subcribe
    client.subscribe([topic_data_device], () => {
      console.log(`${program.protocol}: Subscribe to topic '${topic_data_device}'`)
    })
    client.subscribe([topic_log_device], () => {
      console.log(`${program.protocol}: Subscribe to topic '${topic_log_device}'`)
    }) 
  })


client.on('reconnect', (error) => {
    console.log(`Reconnecting(${program.protocol}):`, error)
  })
  
  client.on('error', (error) => {
    console.log(`Cannot connect(${program.protocol}):`, error)
  })

  module.exports = client;
  exports = {topic_data_device, topic_log_device};