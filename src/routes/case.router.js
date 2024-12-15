const {Router} = require('express');
const router = Router();
const caseCtr = require('../controllers/case-controllers.js');
const auth = require('../helper/auth.js');
const userCtr = require('../controllers/user-controllers.js');

// Rutas de los case
router.post('/createCase',auth.TokenVerify, caseCtr.createCase);
router.get('/listCases', auth.TokenVerify, caseCtr.listCases);
router.get('/listCaseById/:id', auth.TokenVerify, caseCtr.listCaseById);
router.get('/listCaseByAlarmName/:alarmName', auth.TokenVerify, caseCtr.listCaseByAlarmName);
router.get('/listCaseByClient/:client', auth.TokenVerify, caseCtr.listCaseByClient);
router.get('/listCaseByKeyWord/:keyWord', auth.TokenVerify, caseCtr.listCaseByKeyWord);
router.put('/updateCaseById/:id', auth.TokenVerify, caseCtr.updateCaseById);
router.delete('/deleteCase/:id', auth.TokenVerify, caseCtr.deleteCase);


router.get('/listUser', auth.TokenVerify, userCtr.listUsers);


module.exports = router