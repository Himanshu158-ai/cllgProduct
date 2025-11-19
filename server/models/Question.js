const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  inputFormat: String,
  outputFormat: String,
  date: String
});

module.exports = mongoose.model("Question", QuestionSchema);
