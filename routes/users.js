var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/usersCtrl');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/login', usersCtrl.login);
router.post('/changePassword', authenticateToken, usersCtrl.changePassword);

module.exports = router;
