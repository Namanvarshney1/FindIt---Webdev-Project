
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Claim routes are working"
  });
});

const {
  createClaim,
  getMyClaims,
  getAllClaims,
  updateClaimStatus,
} = require("../controllers/claimController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Student: Submit a claim
router.post("/", protect, createClaim);

// Student: View own claims
router.get("/my", protect, getMyClaims);

// Admin: View all claims
router.get("/", protect, adminOnly, getAllClaims);

// Admin: Approve or reject a claim
router.put("/:id/status", protect, adminOnly, updateClaimStatus);

module.exports = router;
