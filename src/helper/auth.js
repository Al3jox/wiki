const auth = {}
const jwt = require('jsonwebtoken');

auth.TokenVerify = (req, res, next) =>{
    try {
        if(!req.headers.autorizacion){
            return res.status(401).json({
                mensaje: 'No estás autorizado'
            })
        }
        
        const token = req.headers.autorizacion;

        if(token === 'null'){
            return res.status(401).json({
                mensaje: '¡No estás autorizado, no tienes un token valido!'
            })
        }

        jwt.verify(token, '%$S3cW1k*1+Pa4s-.', (error, resultado) =>{
            if(error){
                return res.status(401).json({
                    mensaje: 'Hubo un problema con el token, no estás autorizado'
                })                
            }
            next();
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Se ha presentado un error al validar el token: ',
            error: error.message,
            error2: error.errors
        })
    }
}

module.exports = auth;