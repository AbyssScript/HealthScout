// routes/feedbackRoutes.js

const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback"); // Assuming you have a Feedback model

// POST route to handle user feedback
router.post("/", async (req, res) => {
  try {
    // Validate incoming data
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

module.exports = router;
