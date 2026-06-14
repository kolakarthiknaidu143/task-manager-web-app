const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB =
  require("./config/db");

const userRoutes =
  require("./routes/userRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

// Test Route
app.get("/", (req, res) => {
  res.send(
    "Task Manager Server Running..."
  );
});

// Server
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});