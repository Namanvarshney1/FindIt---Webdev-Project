
const mongoose = require("mongoose");
const Claim = require("../models/Claim");
const Item = require("../models/Item");

// Submit Claim
const createClaim = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    if (!itemId || !message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Item ID and claim message are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
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
      message: message.trim(),
    });

    return res.status(201).json({
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

    console.error("Create Claim Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit claim",
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

    return res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    console.error("Get My Claims Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve your claims",
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

    return res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    console.error("Get All Claims Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve claims",
    });
  }
};

// Update Claim Status (Admin)
const updateClaimStatus = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim ID",
      });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    let updatedClaim;

    await session.withTransaction(async () => {
      const claim = await Claim.findOne({
        _id: id,
        status: "pending",
      }).session(session);

      if (!claim) {
        const existingClaim = await Claim.findById(id).session(session);

        if (!existingClaim) {
          throw new Error("CLAIM_NOT_FOUND");
        }

        throw new Error("CLAIM_ALREADY_REVIEWED");
      }

      if (status === "approved") {
        const item = await Item.findOneAndUpdate(
          {
            _id: claim.item,
            type: "found",
            status: "active",
          },
          {
            $set: { status: "claimed" },
          },
          {
            new: true,
            session,
          }
        );

        if (!item) {
          throw new Error("ITEM_NOT_AVAILABLE");
        }

        // Reject other pending claims for the same item
        await Claim.updateMany(
          {
            item: claim.item,
            _id: { $ne: claim._id },
            status: "pending",
          },
          {
            $set: { status: "rejected" },
          },
          { session }
        );
      }

      claim.status = status;
      await claim.save({ session });

      updatedClaim = claim;
    });

    return res.status(200).json({
      success: true,
      message: `Claim ${status} successfully`,
      claim: updatedClaim,
    });
  } catch (error) {
    if (error.message === "CLAIM_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (error.message === "CLAIM_ALREADY_REVIEWED") {
      return res.status(400).json({
        success: false,
        message: "This claim has already been reviewed",
      });
    }

    if (error.message === "ITEM_NOT_AVAILABLE") {
      return res.status(400).json({
        success: false,
        message: "Item is no longer available",
      });
    }

    console.error("Update Claim Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update claim status",
    });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  createClaim,
  getMyClaims,
  getAllClaims,
  updateClaimStatus,
};
