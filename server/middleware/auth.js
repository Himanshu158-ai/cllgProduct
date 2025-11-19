const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Access token expired" });
  }
};

module.exports = verifyAccessToken;
