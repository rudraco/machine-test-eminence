const mongoose = require("mongoose");
const TaskModel = require("../database/tasks");
const UserModel = require("../database/users");
const { ObjectId } = require("mongodb");
const moment = require("moment");
const { storeCache, clearCache } = require("../helpers/cache");
const createTask = async (req, res, next) => {
  try {
    let {
      body: {
        title,
        description,
        creatorId,
        assigneeId,
        status,
        priority,
        dueDate,
        tags,
      },
    } = req;
    let foundUser = await UserModel.findById(creatorId);
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const taskObj = {
      title,
      description,
      creatorId: new ObjectId(creatorId),
      assigneeId: new ObjectId(assigneeId),
      status,
      priority,
      dueDate: moment(dueDate, "YYYY/MM/DD"),
      tags,
    };
    let newTask = await TaskModel.create(taskObj);
    if (!newTask) {
      return res.status(409).json({
        success: false,
        message: "Task not created",
      });
    }
    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getTask = async (req, res, next) => {
  try {
    let {
      query: { taskId },
    } = req;

    let foundTask = await TaskModel.findById(taskId);
    if (!foundTask) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
    await storeCache(`${taskId}`, JSON.stringify(foundTask));
    res.status(200).json({
      success: true,
      message: "Task found from db",
      data: foundTask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const updateTask = async (req, res, next) => {
  try {
    let {
      body: { taskId },
    } = req;
    console.log(taskId);
    let foundTask = await TaskModel.findById(taskId);
    if (!foundTask) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
    let updatedTask = await TaskModel.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    await clearCache(`${taskId}`);
    res.status(200).json({
      success: true,
      message: "Task updated",
      data: updatedTask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    let {
      query: { taskId },
    } = req;

    let foundTask = await TaskModel.findById(taskId);
    if (!foundTask) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
    let deletedTask = await TaskModel.findByIdAndDelete(taskId);
    res.status(200).json({
      success: true,
      message: "Task deleted",
      data: deletedTask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
