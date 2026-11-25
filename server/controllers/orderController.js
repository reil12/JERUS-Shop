const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders  { shippingAddress }  -> turns the cart into an order
exports.checkout = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    if (!shippingAddress) return res.status(400).json({ message: 'Shipping address is required' });

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    const items = (cart?.items || []).filter((i) => i.product);
    if (!items.length) return res.status(400).json({ message: 'Your cart is empty' });

    // stock check
    for (const i of items) {
      if (i.product.stock < i.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${i.product.name}` });
      }
    }

    const orderItems = items.map((i) => ({
      product: i.product._id,
      name: i.product.name,
      image: i.product.image,
      size: i.size,
      price: i.product.price, // snapshot of the price right now
      quantity: i.quantity,
    }));
    const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      total,
      status: 'paid', // simulated payment (Cash/COD or mock) - swap for a real gateway later
    });

    // reduce stock, then clear the cart
    await Promise.all(
      items.map((i) => Product.updateOne({ _id: i.product._id }, { $inc: { stock: -i.quantity } }))
    );
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/mine
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders  (admin)
exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/orders/:id/status  (admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
