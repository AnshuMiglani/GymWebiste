require("dotenv").config();

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("❌ CRITICAL: Neither MONGO_URI nor MONGODB_URI is defined in environment variables!");
} else {
  mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ Successful connection established with MongoDB Atlas/Local");
  })
  .catch((e) => {
    console.error("❌ MongoDB connection error:", e.message);
    console.error("👉 If using MongoDB Atlas on Render, make sure Network Access allows 0.0.0.0/0 (Anywhere)");
  });
}

module.exports = mongoose;