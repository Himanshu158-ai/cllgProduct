const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const { name, email, password } = req.body.formData;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    res.cookie("access_token", accessToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 15 * 60 * 1000 });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: "Unique email required" });
  }
}

const login =  async (req, res) => {
  const { email, password } = req.body.formData;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Something went wrong" });

  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

  res.cookie("access_token", accessToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 15 * 60 * 1000 });
  res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.json({ message: "Login successful", user:user.name });
}

module.exports = {register,login};