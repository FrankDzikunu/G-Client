require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// CORS Configuration (Allow only frontend to access)
const corsOptions = {
  origin: "https://g-client-five.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Serve static files (for uploads)
app.use("/uploads", express.static("uploads"));

// Basic Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit if connection fails
  });

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/register", require("./routes/registercourseRoutes"));
app.use("/api/learners", require("./routes/learnerRoutes"));

// Production: Serve React build files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
