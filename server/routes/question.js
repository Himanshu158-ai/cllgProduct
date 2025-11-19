const router = require("express").Router();
const Question = require("../models/Question");

// Add Question
router.post("/add", async (req, res) => {
  const q = new Question(req.body);
  await q.save();
  res.json({ message: "Question added" });
});

// Get today's questions
router.get("/today", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const data = await Question.find({ date: today });
  res.json(data);
});

module.exports = router;
