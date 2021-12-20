const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const adminController = require('../controllers/adminController');
// getAllOrdersByAdmin
// updateOrderStatus

const router = express.Router();

// Admin order routes
router.get(
  '/admin/orders',
  authCheck,
  adminCheck,
  adminController.getAllOrdersByAdmin
);
router.put(
  '/admin/orders-status',
  authCheck,
  adminCheck,
  adminController.updateOrderStatus
);

module.exports = router;
