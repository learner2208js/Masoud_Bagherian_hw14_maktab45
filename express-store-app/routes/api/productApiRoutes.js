const express = require('express');
const {
  getMatchedProducts,
  getAllProducts,
} = require('./../../controllers/productController');
const router = express.Router();

router.get('/:term', getMatchedProducts);
router.get('/', getAllProducts);

module.exports = router;
