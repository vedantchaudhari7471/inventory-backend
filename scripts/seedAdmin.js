import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const email = process.env.INIT_ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.INIT_ADMIN_PW || 'admin123';
  const hashed = await bcrypt.hash(password, 10);
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', email);
    } else {
      await new User({ email, password: hashed, role: 'admin' }).save();
      console.log('Admin created:', email, 'pw:', password);
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();