const express = require('express');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const productController = require('../controllers/productController');

const router = express.Router();

router.post(
  '/products',
  authCheck,
  adminCheck,
  productController.createProduct
);

router.get('/products/:count', productController.getAllProducts);

router.get('/product/:slug', productController.getOneProduct);

router.delete(
  '/products/:slug',
  authCheck,
  adminCheck,
  productController.deleteProduct
);

router.put(
  '/products/:slug',
  authCheck,
  adminCheck,
  productController.updateProduct
);

// get list of products with sort, filter or limit
// using POST becouse we need send some data with request
router.post('/products', productController.customProductList);

module.exports = router;
