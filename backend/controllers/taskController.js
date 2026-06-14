<<<<<<< HEAD
const Task = require("../models/Task");

// Create Task
const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
    } = req.body;

    const task =
      await Task.create({
        title,
        description,
        dueDate,
        priority,
        user: req.user.id,
      });

    res.status(201).json({
      message:
        "Task added successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Tasks
const getTasks = async (
  req,
  res
) => {
  try {
    const tasks =
      await Task.find({
        user: req.user.id,
      });

    res.status(200).json(
      tasks
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
const updateTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      message:
        "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (
  req,
  res
) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
=======
const Task = require("../models/Task");

// Create Task
const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
    } = req.body;

    const task =
      await Task.create({
        title,
        description,
        dueDate,
        priority,
        user: req.user.id,
      });

    res.status(201).json({
      message:
        "Task added successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Tasks
const getTasks = async (
  req,
  res
) => {
  try {
    const tasks =
      await Task.find({
        user: req.user.id,
      });

    res.status(200).json(
      tasks
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
const updateTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      message:
        "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (
  req,
  res
) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
>>>>>>> bb1c0212e182a1ef965ebdb7d618d48e8a3cab28
};