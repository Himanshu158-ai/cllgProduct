const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    testcase: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);