const router = require('express').Router();
const c = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', c.getProducts);
router.get('/:id', c.getProduct);
router.post('/', protect, adminOnly, upload.single('imageFile'), c.createProduct);
router.put('/:id', protect, adminOnly, upload.single('imageFile'), c.updateProduct);
router.delete('/:id', protect, adminOnly, c.deleteProduct);

module.exports = router;
