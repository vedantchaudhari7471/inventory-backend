const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });