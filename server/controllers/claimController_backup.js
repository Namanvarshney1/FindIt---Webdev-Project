
const Claim = require("../models/Claim");
const Item = require("../models/Item");

// Submit Claim
const createClaim = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    if (!itemId || !message) {
      return res.status(400).json({
        success: false,
        message: "Item ID and claim message are required",
      });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.type !== "found") {
      return res.status(400).json({
        success: false,
        message: "Only found items can be claimed",
      });
    }

    if (item.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This item is no longer available for claims",
      });
    }

    if (item.reportedBy.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot claim your own item",
      });
    }

    const existingClaim = await Claim.findOne({
      item: itemId,
      claimedBy: req.user._id,
    });

    if (existingClaim) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a claim for this item",
      });
    }

    const claim = await Claim.create({
      item: itemId,
      claimedBy: req.user._id,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      claim,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a claim for this item",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User's Claims
const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      claimedBy: req.user._id,
    })
      .populate("item")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Claims (Admin)
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("item")
      .populate("claimedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Claim Status (Admin)
const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This claim has already been reviewed",
      });
    }

    if (status === "approved") {
      const item = await Item.findById(claim.item);

      if (!item || item.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Item is no longer available",
        });
      }

      item.status = "claimed";
      await item.save();
    }

    claim.status = status;
    await claim.save();

    res.status(200).json({
      success: true,
      message: `Claim ${status} successfully`,
      claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createClaim,
  getMyClaims,
  getAllClaims,
  updateClaimStatus,
};
