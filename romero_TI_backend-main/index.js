var express = require('express');
const cors = require('cors');
var square = require('./post_medicion_LR/index.js');
var app = express();

// necesario para parsear el post (body)
app.use(express.json());

//Configuración CORS (para que un cliente puede comunicarse con el backend)

var corsConfig = { 
    origin: '*',
    optionSuccessStatus:200,
};


//Middewere CORS
app.use(cors(corsConfig));

var PORT = 3002;  // grafana esta usando el 3000 ojo

//ruteo dispositivo
var routerRemoteLab= require('./routes/remotelab');
//ruteo dispositivo
var routerDevice = require('./routes/device');
//ruteo log dispositivo
var routerLog = require('./routes/log');
//ruteo dispositivo
var routerPostDevice = require('./routes/post_device');

app.use('/api/remotelab', routerRemoteLab);
app.use('/api/device', routerDevice);
app.use('/api/log', routerLog);
app.use('/api/postdevice', routerPostDevice);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});