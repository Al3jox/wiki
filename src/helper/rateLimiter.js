const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Minutos, 60 segundos, 1000 milisegundos
    limit: 20, // Número de peticiones por los minutos definidos
    standarHeaders: 'draft-8',
    legacyHeaders:false,
    message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.',
    statusCode: 429, //Demasiadas solicitudes
});

module.exports = limiter;