const {Router} = require('express');
const router = Router();
const userCtr = require('../controllers/user-controllers.js');
const usersModel = require('../models/users-model.js');
const auth = require('../helper/auth.js');

// Rutas del user
router.post('/createUser', userCtr.createUser);
router.get('/listUser', auth.TokenVerify, userCtr.listUsers);
router.get('/listUsersById/:id', auth.TokenVerify, userCtr.listUsersById);
router.put('/updateUserById/:id', auth.TokenVerify, userCtr.updateUserById);
router.delete('/deleteUser/:id', auth.TokenVerify, userCtr.deleteUser);
router.post('/login', userCtr.login);

module.exports = router