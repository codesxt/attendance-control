var router = require('express').Router();
var attendanceController = require('../controllers/attendance');
router.post('/attendant', attendanceController.register);
router.get('/attendants', attendanceController.list);
router.delete('/attendant/:id', attendanceController.remove);
module.exports = router;
