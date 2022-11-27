var express = require('express');
var router = express.Router();
const donutsCtrl = require('../controllers/donutsCtrl');

router.get('/', donutsCtrl.getAllDonuts);
router.post('/', donutsCtrl.createDonut);

module.exports = router;