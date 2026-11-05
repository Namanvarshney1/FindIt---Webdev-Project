
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");

// Create an item (Student and Admin)
router.post("/", protect, upload.single("image"), createItem);

// Get all items (Public)
router.get("/", getAllItems);

// Get a single item (Public)
router.get("/:id", getItemById);

// Update an item (Owner or Admin)
router.put("/:id", protect, upload.single("image"), updateItem);

// Delete an item (Owner or Admin)
router.delete("/:id", protect, deleteItem);

module.exports = router;
