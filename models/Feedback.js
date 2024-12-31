// models/Feedback.js

const mongoose = require("mongoose");

// Define the Feedback schema
const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the Feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
