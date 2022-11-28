var express = require('express');
var router = express.Router();
const donutsCtrl = require('../controllers/donutsCtrl');

router.get('/', donutsCtrl.getAllDonuts);
router.post('/', donutsCtrl.createDonut);
router.delete('/:id', donutsCtrl.deleteDonut);
router.put('/:id', donutsCtrl.updateDonut);
router.get('/:id', donutsCtrl.getDonutById);

module.exports = router;