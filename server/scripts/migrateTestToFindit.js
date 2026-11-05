
require("dotenv").config();
const mongoose = require("mongoose");

const migrateData = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to:", mongoose.connection.name);

    const sourceDB = mongoose.connection.useDb("test").db;
    const targetDB = mongoose.connection.useDb("findit").db;

    // Migrate Users
    console.log("\nMigrating users...");

    const users = await sourceDB.collection("users").find().toArray();
    const userMap = new Map();

    for (const user of users) {
      const existing = await targetDB.collection("users").findOne({
        email: user.email,
      });

      if (existing) {
        userMap.set(user._id.toString(), existing._id);
        console.log("User already exists:", user.email);
      } else {
        await targetDB.collection("users").insertOne(user);
        userMap.set(user._id.toString(), user._id);
        console.log("User copied:", user.email);
      }
    }

    // Migrate Items
    console.log("\nMigrating items...");

    const items = await sourceDB.collection("items").find().toArray();

    for (const item of items) {
      const existing = await targetDB.collection("items").findOne({
        _id: item._id,
      });

      if (existing) {
        console.log("Item already exists:", item.title);
        continue;
      }

      if (item.reportedBy) {
        const mappedUser = userMap.get(item.reportedBy.toString());

        if (mappedUser) {
          item.reportedBy = mappedUser;
        }
      }

      await targetDB.collection("items").insertOne(item);
      console.log("Item copied:", item.title);
    }

    // Migrate Claims
    console.log("\nMigrating claims...");

    const claims = await sourceDB.collection("claims").find().toArray();

    for (const claim of claims) {
      if (claim.claimedBy) {
        const mappedUser = userMap.get(claim.claimedBy.toString());

        if (mappedUser) {
          claim.claimedBy = mappedUser;
        }
      }

      const existing = await targetDB.collection("claims").findOne({
        _id: claim._id,
      });

      if (existing) {
        console.log("Claim already exists:", claim._id);
        continue;
      }

      await targetDB.collection("claims").insertOne(claim);
      console.log("Claim copied:", claim._id);
    }

    console.log("\nMigration completed successfully!");

    console.log("Users processed:", users.length);
    console.log("Items processed:", items.length);
    console.log("Claims processed:", claims.length);

  } catch (error) {
    console.error("\nMigration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

migrateData();
