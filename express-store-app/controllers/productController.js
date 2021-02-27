const products = require('./readProducts');

const sendProductPage = (req, res) => {
  const product = products.find((product) => product.id === +req.params.id);
  res.render('product', { product, hasSearchBox: false });
};
const getMatchedProducts = (req, res) => {
  let matchedProducts = [];
  const term = req.params.term.toLowerCase();
  products.forEach((product) => {
    if (
      product.name.toLowerCase().includes(term) ||
      product.material.toLowerCase().includes(term)
    ) {
      matchedProducts.push(product);
    }
  });
  res.status(200).json({
    status: 'success',
    product_count: matchedProducts.length,
    data: {
      products: matchedProducts,
    },
  });
};

const getAllProducts = (req, res) => {
  res.status(200).json({
    status: products.length ? 'success' : 'fail',
    product_count: products.length,
    data: {
      products,
    },
  });
};
module.exports = { sendProductPage, getMatchedProducts, getAllProducts };
