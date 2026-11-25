const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// GET /api/stats  (admin) - sales tracking numbers for the dashboard
exports.getStats = async (req, res) => {
  try {
    const counted = { status: { $ne: 'cancelled' } };

    const [totals] = await Order.aggregate([
      { $match: counted },
      { $group: { _id: null, revenue: { $sum: '$total' }, orders: { $sum: 1 } } },
    ]);

    const topProducts = await Order.aggregate([
      { $match: counted },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          unitsSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        },
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 5 },
    ]);

    // last 7 days of sales
    const since = new Date();
    since.setDate(since.getDate() - 6);
    since.setHours(0, 0, 0, 0);
    const daily = await Order.aggregate([
      { $match: { ...counted, createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
    ]);
    const byDay = Object.fromEntries(daily.map((d) => [d._id, d]));
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(since);
      d.setDate(since.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      last7Days.push({
        date: key,
        revenue: byDay[key]?.revenue || 0,
        orders: byDay[key]?.orders || 0,
      });
    }

    res.json({
      totalRevenue: totals?.revenue || 0,
      totalOrders: totals?.orders || 0,
      totalProducts: await Product.countDocuments(),
      totalCustomers: await User.countDocuments({ role: 'user' }),
      topProducts,
      last7Days,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
