const express = require("express");
const User = require("../Models/Signup");

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user, message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "User creation failed", error });
  }
});

module.exports = router;