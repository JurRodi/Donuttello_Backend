var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/usersCtrl');

router.post('/login', usersCtrl.login);
router.post('/changePassword', usersCtrl.changePassword);

module.exports = router;
