/* eslint-disable no-dupe-keys */
const Joi = require("joi");

module.exports = {
  createTask: Joi.object({
    body: {
      title: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().required(),
      priority: Joi.string().required(),
      dueDate: Joi.date(),
      assigneeId: Joi.string().required(),
      creatorId: Joi.string().required(),
    },
  }),
  updateTask: Joi.object({
    body: {
      taskId: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().required(),
      priority: Joi.string().required(),
      dueDate: Joi.date(),
      assigneeId: Joi.string().required(),
      creatorId: Joi.string().required(),
    },
  }),
  getTask: Joi.object({
    query: {
      taskId: Joi.string().required(),
    },
  }),
};
