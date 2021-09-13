const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  allProducts.forEach(product => {
    const image = product.image;  // fixed 
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
      <div class=" rounded" style="background-image: linear-gradient(rgb(0, 255, 157),rgb(31, 195, 236));">
    <img class="product-image" src=${image}></img>
      
    
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h5 class="">Rating: <span class="text-danger">${product.rating.rate}</span> Raters: <span class="text-warning">${product.rating.count}</span></h5>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  })
};



const loadDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));

}

// showing details 

const showDetails = product => {

  const topDetails = document.getElementById('show-details')
  topDetails.textContent = '';

  const image = product.image;  // fixed 
  const div = document.createElement("div");

  div.innerHTML = `  <div class="row single-product g-0 rounded" style="background-color:lightblue">
    <div class="col-md-2 ">
      <img src="${image}" class="product-image rounded" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Details</h5>
         <h3>${product.title}</h3>
         <p>Category: ${product.category}</p>
        <p class="card-text">Desciption: ${product.description} </p>
      </div>
    </div>
  </div>`
  topDetails.appendChild(div);

}

// Price count

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);

  return converted;

};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2); // fixed
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);  // fixed
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotalText =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  grandTotal = parseFloat(grandTotalText).toFixed(2);

  document.getElementById("total").innerText = grandTotal;
};
