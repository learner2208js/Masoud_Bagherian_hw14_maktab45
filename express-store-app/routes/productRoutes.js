const express = require('express');
const { sendProductPage } = require('../controllers/productController');

const router = express.Router();

router.get('/:id', sendProductPage);

module.exports = router;
