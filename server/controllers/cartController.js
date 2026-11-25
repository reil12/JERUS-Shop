const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

const populated = (cart) => cart.populate('items.product');

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    // drop items whose product was deleted by the admin
    cart.items = cart.items.filter(Boolean);
    await populated(cart);
    cart.items = cart.items.filter((i) => i.product);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart  { productId, size, quantity }
exports.addToCart = async (req, res) => {
  try {
    const { productId, size = 'M', quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cart = await getOrCreateCart(req.user._id);
    const existing = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );
    if (existing) existing.quantity += Number(quantity);
    else cart.items.push({ product: productId, size, quantity: Number(quantity) });

    await cart.save();
    await populated(cart);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/cart/:itemId  { quantity }
exports.updateItem = async (req, res) => {
  try {
    const qty = Number(req.body.quantity);
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    if (qty < 1) item.deleteOne();
    else item.quantity = qty;
    await cart.save();
    await populated(cart);
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/cart/:itemId
exports.removeItem = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.id(req.params.itemId);
    if (item) item.deleteOne();
    await cart.save();
    await populated(cart);
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
