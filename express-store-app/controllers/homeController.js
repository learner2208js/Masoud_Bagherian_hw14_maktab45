const products = require('./readProducts');
const sendHomePage = (req, res) => {
  res.render('home', { products, hasSearchBox: true });
};

module.exports = { sendHomePage };
