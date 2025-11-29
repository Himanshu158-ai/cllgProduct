// const router = require("express").Router();
// // const User = require("../models/User");
// const User = require('../models/user')
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Register
// router.post("/register", async (req, res) => {
//   // console.log(req.body.formData);
//   const { name, email, password } = req.body.formData;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'All fields required' });
//   }

//   try {
//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({ name, email, password: hashed });
//     await user.save();

//     res.json({ message: "User registered", user });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal error' });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {

//   const { email, password } = req.body.formData;

//   const user = await User.findOne({ email });
//   if (!user) return res.json({ error: "User not found" });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.json({ error: "Wrong password" });

//   const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

//   res.json({ message: "Login success", token, user });
// });


// module.exports = router;


const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {register,login} = require("../controllers/auth.controll");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login",login);

// REFRESH TOKEN
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });

    res.cookie("access_token", newAccessToken, {
      httpOnly: true, secure: true, sameSite: "strict", maxAge: 15 * 60 * 1000
    });

    res.json({ message: "New access token created" });

  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.json({ message: "Logged out" });
});

module.exports = router;
