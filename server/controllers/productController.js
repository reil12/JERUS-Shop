const Product = require('../models/Product');

// Build the image value from an upload or a pasted URL
const resolveImage = (req) => {
  if (req.file) return `/uploads/${req.file.filename}`;
  if (req.body.image) return req.body.image;
  return undefined;
};

const parseSizes = (sizes) => {
  if (!sizes) return undefined;
  if (Array.isArray(sizes)) return sizes;
  return String(sizes).split(',').map((s) => s.trim()).filter(Boolean);
};

// GET /api/products  (public)
exports.getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/:id  (public)
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product id' });
  }
};

// POST /api/products  (admin) - multipart: image file OR image URL
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || price === undefined || price === '') {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stock: stock !== undefined && stock !== '' ? Number(stock) : undefined,
      sizes: parseSizes(req.body.sizes),
      image: resolveImage(req),
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/products/:id  (admin) - change price, image, details
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, category, stock } = req.body;
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined && price !== '') product.price = Number(price);
    if (category !== undefined) product.category = category;
    if (stock !== undefined && stock !== '') product.stock = Number(stock);
    const sizes = parseSizes(req.body.sizes);
    if (sizes) product.sizes = sizes;
    const image = resolveImage(req);
    if (image !== undefined) product.image = image;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/products/:id  (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid product id' });
  }
};
