const router = require('express').Router();
const c = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, c.checkout);
router.get('/mine', protect, c.myOrders);
router.get('/', protect, adminOnly, c.allOrders);
router.put('/:id/status', protect, adminOnly, c.updateStatus);

module.exports = router;
