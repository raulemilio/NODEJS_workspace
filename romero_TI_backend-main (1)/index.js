var express = require('express');
const cors = require('cors');
var square = require('./post_medicion/index.js');

var app = express();

// necesario para parsear el post (body)
app.use(express.json());

//Configuración CORS (para que un cliente puede comunicarse con el backend)
var corsConfig = { 
    origin:'*',
    optionSuccessStatus:200
};

//Middewere CORS
app.use(cors(corsConfig));

var PORT = 3007;
//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
//ruteo dispositivo
var routerMedicion = require('./routes/medicion');
//ruteo dispositivo
var routerLog = require('./routes/log');

app.use('/api/dispositivo', routerDisp);
app.use('/api/log', routerLog);
app.use('/api/medicion', routerMedicion);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});