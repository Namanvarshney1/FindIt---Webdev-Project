const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Profile accessed successfully",
    user: req.user,
  });
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin!",
  });
});

module.exports = router;