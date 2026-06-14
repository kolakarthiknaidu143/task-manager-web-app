const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Add Task
router.post(
  "/",
  authMiddleware,
  createTask
);

// Get All Tasks
router.get(
  "/",
  authMiddleware,
  getTasks
);

// Update Task
router.put(
  "/:id",
  authMiddleware,
  updateTask
);

// Delete Task
router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

module.exports = router;