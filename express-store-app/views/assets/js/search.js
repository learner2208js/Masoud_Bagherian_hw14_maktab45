const searchInput = document.getElementById('search-input');
const productsList = document.getElementById('products-list');

function ajax(method, url, callback) {
  const http = new XMLHttpRequest();
  function getResponse() {
    if (this.readyState === 4) {
      callback(this.response);
    }
  }
  http.open(method, url);
  http.send();
  http.addEventListener('readystatechange', getResponse);
}
function searchProduct() {
  ajax('get', `/api/v1/products/${this.value.trim()}`, (response) => {
    const responseBody = JSON.parse(response);
    const products = responseBody.data.products;
    fillProductsList(products, this.value);
    highlightMatchedWords(this.value.trim());
  });
}
function fillProductsList(products, term) {
  productsList.innerHTML = '';
  if (!products.length) {
    productsList.innerHTML += `<p class="product__alert">Your search for "${term}" did not match</p>`;
    return;
  }
  products.forEach((product) => {
    productsList.innerHTML += `<div class="product-wrapper">
    <div class="product">
      <div class="product__image">
        <img src="/${product.image}" alt="" class="image" />
      </div>
      <!-- end .product__image -->
      <div class="product__content">
        <div class="product__item">
          <h5 class="product__label">name</h5>
          <h3 class="product__name">${product.name}</h3>
        </div>
        <div class="product__item">
          <h5 class="product__label">material</h5>
          <h4 class="product__material">${product.material}</h4>
        </div>
        <div class="product__item">
          <h5 class="product__label">size</h5>
          <h4 class="product__size">${product.size}</h4>
        </div>
        <div class="product__footer">
          <a href="/product/${product.id}" class="product__link"
            >add to cart</a
          >
          <h4 class="product__price">$${product.price}</h4>
        </div>
      </div>
      <!-- end .product__content -->
    </div>
    <!-- end .product -->
  </div>
  <!-- end .product-wrapper -->`;
  });
}
function highlightMatchedWords(term) {
  highlightNameSection(term);
  hightlihtMaterialSection(term);
}
function highlightNameSection(term) {
  const nameParts = document.querySelectorAll('.product__name');
  nameParts.forEach((name) => {
    const text = name.textContent;
    name.innerHTML = highlightText(text, term, [
      'red',
      'green',
      'cyan',

      'orange',
      'yellow',
    ]);
  });
}
function hightlihtMaterialSection(term) {
  const materialParts = document.querySelectorAll('.product__material');
  materialParts.forEach((material) => {
    const text = material.textContent;
    material.innerHTML = highlightText(text, term, [
      'red',
      'green',
      'cyan',
      'orange',
      'yellow',
    ]);
  });
}
searchInput.addEventListener('input', searchProduct);
