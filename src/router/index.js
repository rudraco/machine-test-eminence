const router = require('express').Router();
const healthRoute = require('./health-route');
const taskRoute = require('./task-route');

router.use('/health-route', healthRoute);
router.use('/task-route', taskRoute);

module.exports = router;