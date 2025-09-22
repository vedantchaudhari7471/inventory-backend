import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Sign up (used for testing or disabling in production)
router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role: role || 'user' });
    await user.save();
    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Email may already be in use' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing' });
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;