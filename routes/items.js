import express from 'express';
import Item from '../models/Item.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

// List items (any authenticated user)
router.get('/', authenticate, async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 }).limit(1000);
  res.json(items);
});

// Get single item (any authenticated user)
router.get('/:id', authenticate, async (req, res) => {
  const it = await Item.findById(req.params.id);
  if (!it) return res.status(404).json({ error: 'Not found' });
  res.json(it);
});

// Create new item (admin only)
router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  const { name, sku, qty, location, notes } = req.body;
  const it = new Item({ name, sku, qty, location, notes });
  await it.save();
  res.json(it);
});

// Update item (any authenticated user)
router.put('/:id', authenticate, async (req, res) => {
  const it = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!it) return res.status(404).json({ error: 'Not found' });
  res.json(it);
});

// Delete item warning (optional - only admin can delete)
router.delete('/:id', authenticate, requireRole('admin'), async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;