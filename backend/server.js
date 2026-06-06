require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const streamRoutes = require("./routes/streamRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const assessmentRoutes = require("./routes/assesmentRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const resultsRoutes = require("./routes/resultRoutes");
const reportRoutes = require("./routes/reportRoutes");


// Auth
app.use("/api/auth", authRoutes);

// Modules
app.use("/api/students", studentRoutes);
app.use("/api/streams", streamRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/report", reportRoutes);

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});