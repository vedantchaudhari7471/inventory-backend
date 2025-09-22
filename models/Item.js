import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  qty: { type: Number, default: 0 },
  location: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);