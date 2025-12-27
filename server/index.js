const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const questionRoute = require("./routes/question");
const runcode = require("./routes/run")
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/user", authRoute);
app.use("/api/questions", questionRoute); // ✅ FIXED
app.use("/run", runcode);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("🚀 Server running on port " + process.env.PORT);
});
