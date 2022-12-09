var express = require('express')
var router = express.Router()
const donutsCtrl = require('../controllers/donutsCtrl')
const authenticateToken = require('../middleware/authenticateToken')

router.get('/', authenticateToken, donutsCtrl.getAllDonuts)
router.post('/', donutsCtrl.createDonut)
router.delete('/:id', authenticateToken, donutsCtrl.deleteDonut)
router.put('/:id', authenticateToken, donutsCtrl.updateDonut)
router.get('/:id', authenticateToken, donutsCtrl.getDonutById)

module.exports = router
