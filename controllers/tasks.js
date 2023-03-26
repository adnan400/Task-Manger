const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
const { NextPlan } = require('@mui/icons-material');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res
  //   .status(200)
  //   .json({ status: 'success', data: { tasks, onHits: tasks.length } });
});

const createTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task });
});

const deleteTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No Task with Id:${taskID}`, 404));
  }
  return res.status(200).json(task);
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No Task with Id:${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  return res.status(200).json({ task });
});

const updateTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No Task with Id:${taskID}`, 404));
  }

  return res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  getSingleTask,
};

//REST : representational state transfer
