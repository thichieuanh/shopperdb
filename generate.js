const { random, round } = require('lodash')
const arrayLength = 8;
let controlID = 0;
const productInfo = require('./productInfo');
const categoryKeys = ['women', 'men', 'kids'];

/* Get image URLs */
function getImgUrl(index, group) {
  return `/img/products/${group}/product${index + 1}a.jpeg`
}

function getImgOnHoverUrl(index, group) {
  return `/img/products/${group}/product${index + 1}b.jpeg`
}


/* Get product status (new or sale) */
let productStatus = {
  isNew: undefined,
  price: undefined,
  discountVal: undefined,
  discountedPrice: undefined
}

/* Price */
function getPrice() {
  let minPrice = 50;
  let maxPrice = 500;
  return (Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice);
}

function getProductStatus() {
  const newExpression = Math.random() >= 0.5; // Expression will return true 50% of the time, and false the other 50%
  const discountExpression = Math.random() >= 0.5
  productStatus.isNew = newExpression;
  let isDiscounted = productStatus.isNew ? false : discountExpression; // New product is not discounted
  productStatus.discountVal = isDiscounted ? round(random(0.1, 0.7), 2) : 0

  productStatus.price = getPrice().toFixed(2);
  productStatus.discountedPrice = isDiscounted ? '$' + ((productStatus.price * (1 - productStatus.discountVal)).toFixed(2)) : '';
}


/* Sizes */
// function getSizes(category) {

// }

module.exports = function () {
  // let data = { "women": [], "men": [], "kids": [] };
  let data = {}

  function createData(group) {
    let products = [];
    for (let i = 0; i < arrayLength; i++) {
      getProductStatus();
      controlID++;
      products.push({
        "id": controlID,
        "images": {
          "img": getImgUrl(i, group),
          "imgOnHover": getImgOnHoverUrl(i, group),
        },
        "category": productInfo[group]['categories'][i],
        "name": productInfo[group]['productName'][i],
        "isNew": productStatus.isNew,
        "pricing": {
          "price": '$' + productStatus.price,
          "discount": productStatus.discountVal,
          "discountedPrice": productStatus.discountedPrice,
        },
        'sizes': ['XS', 'S', 'M', 'L', 'XL'],
      })
    }
    return products;
  }

  for (const key of categoryKeys) {
    data[key] = createData(key);
  }

  return data
}