const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' }, // URL or /uploads/filename
    category: { type: String, default: 'T-Shirt' },
    sizes: { type: [String], default: ['S', 'M', 'L', 'XL'] },
    stock: { type: Number, default: 100, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
