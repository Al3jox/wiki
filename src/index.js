// requerimientos
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const req = require('express/lib/request');

// Requerimos la BD
require('./database')

// Configuración del puerto y middelwares
app.set('Port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origen: '*'}));

// Rutas
app.use('/users', require('./routes/user.router.js'));
app.use('/cases', require('./routes/case.router.js'));

// Oir el puerto
app.listen(app.get('Port'), () =>{
    console.log("Escuchando al servidor:", app.get('Port'));
})