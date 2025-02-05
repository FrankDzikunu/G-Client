require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));


  const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes.js");
app.use("/api/dashboard", dashboardRoutes);

const invoicesRoutes = require('./routes/invoiceRoutes');
app.use("/api/invoices", invoicesRoutes);

const courseRoutes = require('./routes/courseRoutes');
app.use("/api/courses", courseRoutes);

app.use("/api/register", require("./routes/registercourseRoutes"));
app.use("/uploads", express.static("uploads"));


