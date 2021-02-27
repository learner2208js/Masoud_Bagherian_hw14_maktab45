const express = require('express');
const path = require('path');
const { sendHomePage } = require('./controllers/homeController');
const productRouter = require('./routes/productRoutes');
const productApiRouter = require('./routes/api/productApiRoutes');
const app = express();

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use('/assets', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/assets', req.url));
});

app.use('/product', productRouter);
app.use('/api/v1/products', productApiRouter);
app.get('/', sendHomePage);
app.get('/about', (req, res) => {
  res.render('about', { hasSearchBox: false });
});
app.get('/contact', (req, res) => {
  res.render('contact', { hasSearchBox: false });
});
app.listen(3000, () => {
  console.log('App running on port 3000');
});
