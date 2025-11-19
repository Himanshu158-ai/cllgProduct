const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth')
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use('/user',authRoute);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
