const router = require("express").Router();
const taskCtrl = require("../controller/taskController");
const validate = require("../helpers/validate");
const paramValidation = require("../config/param-validation");
const {checkCacheMiddleware} = require("../helpers/cache");

router
  .route("/")
  .get(validate(paramValidation.getTask), checkCacheMiddleware,taskCtrl.getTask)
  .post(validate(paramValidation.createTask), taskCtrl.createTask)
  .put(validate(paramValidation.updateTask), taskCtrl.updateTask)
  .delete(validate(paramValidation.getTask), taskCtrl.deleteTask);

module.exports = router;
