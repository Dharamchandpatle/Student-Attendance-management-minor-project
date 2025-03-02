require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./configue/db");
const authRoutes = require("./routes/authRoutes");
const classAttendanceRoutes = require("./routes/classAttendanceRoutes");
const examAttendanceRoutes = require("./routes/examAttendanceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/class-attendance", classAttendanceRoutes); // Class attendance ke liye
app.use("/api/exam-attendance", examAttendanceRoutes);   // Exam attendance ke liye

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});