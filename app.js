// filepath: server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const errorHandler = require("./utils/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Logging and Handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// Database Connection
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/gitmyhubDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start Server
const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
