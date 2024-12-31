// Import necessary dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log requests to the console
app.use(express.json()); // Parse JSON bodies

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, "frontend")));

// Serve index.html as the homepage
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "frontend", "index.html");
  console.log("Serving file from:", filePath); // Log the file path for debugging
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Feedback API route
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
