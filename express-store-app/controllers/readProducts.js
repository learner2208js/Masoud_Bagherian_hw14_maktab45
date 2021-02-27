const fs = require('fs');
const path = require('path');

let products;
try {
  products = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../products.json'))
  );
} catch (error) {
  products = [];
}
module.exports = products;
