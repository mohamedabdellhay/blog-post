const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed", details: err });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });
  console.log(user);
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user: user.username });
});

module.exports = router;
