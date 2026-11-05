<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
=======

const express = require("express");
const cors = require("cors");
const path = require("path");
>>>>>>> 56080fe (Add backend server implementation)
require("dotenv").config();

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
<<<<<<< HEAD
const userRoutes = require("./routes/userRoutes");
=======
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");
>>>>>>> 56080fe (Add backend server implementation)

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
=======
app.use(express.urlencoded({ extended: true }));


// Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
>>>>>>> 56080fe (Add backend server implementation)

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FindIt Backend is running!",
    database: "MongoDB",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
<<<<<<< HEAD

// Handle unknown routes
=======
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);

// Handle Unknown Routes
>>>>>>> 56080fe (Add backend server implementation)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

<<<<<<< HEAD
=======
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(err.name === "MulterError" ? 400 : 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

>>>>>>> 56080fe (Add backend server implementation)
// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`FindIt server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

<<<<<<< HEAD
startServer();
=======
startServer();
>>>>>>> 56080fe (Add backend server implementation)
