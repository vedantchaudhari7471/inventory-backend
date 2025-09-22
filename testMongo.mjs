// testMongo.mjs
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is undefined. Check .env file!");
  process.exit(1);
}

// Wrap in async function for top-level await safety
async function main() {
  try {
    await mongoose.connect(uri); // options are optional in Mongoose 7+
    console.log("MongoDB connected successfully!");
    process.exit(0); // exit only if this is a test script
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

main();