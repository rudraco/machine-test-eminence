const router = require('express').Router(); 
const {healthCtrl} = require('../controller/healthController');

router.route('/').get(healthCtrl);

module.exports = router;