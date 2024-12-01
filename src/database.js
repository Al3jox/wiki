const mongoose = require('mongoose');

// Conexión a BD Local
URL = ('mongodb://localhost/wiki');


mongoose.connect(URL)
.then(db => console.log('Conexión exitosa a la BD: ', db.connection.name))
.catch(error => console.log(error))