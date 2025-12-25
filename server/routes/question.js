const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

//add
router.post("/add", async (req, res) => {
  console.log(req.body)
  try {
    const { title, description, testcase } = req.body;

    if (!title || !description || !testcase) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newQuestion = new Question({ title, description, testcase });
    await newQuestion.save();

    res.status(201).json({
      message: "Question added successfully",
      question: newQuestion
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//showing
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//delete one
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//all delete
router.delete("/delete", async (req, res) => {
  try {
    // const deleted = await Question.findByIdAndDelete(id);
    const deleted = await Question.deleteMany();

    if (!deleted) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "All Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
