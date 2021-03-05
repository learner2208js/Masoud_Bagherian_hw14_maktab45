const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const routeDivider = require('./routes/allRoutes');

app.set('views', path.join(__dirname, '/views/pages'));
app.set('view engine', 'ejs');
// app.use(morgan('dev'));
app.use(express.json());
app.use('/assets', (req, res) => {
  let filePath = req.url;
  if (filePath.includes('/font-awesome/fonts') && filePath.includes('?')) {
    // delete ? and whatever after that from font-awesome files url request
    filePath = filePath.split('?')[0];
  }
  res.sendFile(path.join(__dirname, 'views/assets', filePath));
});

app.use('/', routeDivider);

module.exports = app;
