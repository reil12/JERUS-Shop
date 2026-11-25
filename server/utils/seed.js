require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

// Placeholder images are generated as SVG data URLs so the shop looks good with zero setup.
// The admin can replace any of them with a real photo from the dashboard.
const shirtImage = (color, label) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f3f3f3"/><path d="M130 50 L60 100 L90 160 L125 140 L125 340 L275 340 L275 140 L310 160 L340 100 L270 50 Q200 90 130 50Z" fill="${color}"/><text x="200" y="230" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" fill="#fff">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const products = [
  { name: 'JERUS Classic Tee - Black', price: 399, color: '#111111', label: 'JERUS', description: 'Soft cotton everyday tee with the classic JERUS logo.' },
  { name: 'JERUS Classic Tee - White', price: 399, color: '#9aa0a6', label: 'JERUS', description: 'Breathable white tee, relaxed fit.' },
  { name: 'Street Graphic Tee - Red', price: 449, color: '#c62828', label: 'STREET', description: 'Bold streetwear graphic print.' },
  { name: 'Oversized Tee - Navy', price: 499, color: '#1a2a5e', label: 'OVERSIZED', description: 'Heavyweight oversized fit for a clean drop-shoulder look.' },
  { name: 'Minimal Logo Tee - Olive', price: 429, color: '#4b5d3a', label: 'MINIMAL', description: 'Minimal chest logo, earthy olive tone.' },
  { name: 'Limited Edition Tee - Gold', price: 599, color: '#b8860b', label: 'LIMITED', description: 'Limited drop. Premium print and fabric.' },
];

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing. Copy server/.env.example to server/.env and configure it.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected. Seeding...');

    const email = (process.env.ADMIN_EMAIL || 'admin@dbtk.com').toLowerCase();
    let admin = await User.findOne({ email });
    if (!admin) {
      if (!process.env.ADMIN_PASSWORD) {
        throw new Error('ADMIN_PASSWORD is missing. Set it in server/.env before creating the admin account.');
      }

      await User.create({
        name: 'Shop Admin',
        email,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log(`Admin created: ${email}`);
    } else {
      console.log(`Admin already exists: ${email}`);
    }

    if ((await Product.countDocuments()) === 0) {
      await Product.insertMany(
        products.map((p) => ({
          name: p.name,
          price: p.price,
          description: p.description,
          image: shirtImage(p.color, p.label),
        }))
      );
      console.log(`${products.length} sample shirts added`);
    } else {
      console.log('Products already exist, skipping sample shirts');
    }
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
