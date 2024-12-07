const {Router} = require('express');
const router = Router();
const userCtr = require('../controllers/user-controllers.js');
const usersModel = require('../models/users-model.js');

router.post('/createUser', userCtr.createUser);
router.get('/listUser', userCtr.listUsers);
router.get('/listUsersById/:id', userCtr.listUsersById);
router.put('/updateUserById/:id', userCtr.updateUserById);
router.delete('/deleteUser/:id', userCtr.deleteUser);

// router.post('/loginAdmin', adminCtr.login);

module.exports = router