let data = {};
let databaseURL =
  "https://pizza-demo-cf3fa-default-rtdb.europe-west1.firebasedatabase.app/list/";

let index = window.location.search.substring(4);
if (index.length < 1) {
  window.location = "produse.html";
}

async function getData() {
  let url = databaseURL + index + ".json";
  const response = await fetch(url);
  let serverResponseJSON = await response.json();
  data = serverResponseJSON;

  load();
}

function load() {
  document.getElementById("cardTitle").innerText = data.title;

  let image;
  if (data.photo === undefined) {
    image =
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  } else {
    image = data.photo;
  }
  document.getElementById("pizzaImage").src = image;

  document.getElementById("ingredientsInfo").innerText = data.ingredients;
  document.getElementById("typeDough").innerText = data.typeDough;
  document.getElementById("sizeInfo").innerText = data.size + "cm";
  document.getElementById("priceInfo").innerHTML = data.price + "€";
}

function addToCart() {
  let idProduct = index;
  let quantity = document.getElementById("countText").value;
  quantity = Number(quantity);
  if (isNaN(quantity) || quantity <= 0) {
    document.getElementById("countText").classList.add("invalid");
    alert("The quantity is not valid");
    return;
  }
  let product = {
    idProduct: idProduct,
    title: data.title,
    photo: data.photo,
    price: data.price,
    quantity: quantity,
    typeDough: data.typeDough,
    size: data.size,
  };
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  let found = false;
  for (let prod of cart) {
    if (prod.idProduct === product.idProduct) {
      prod.quantity += product.quantity;
      found = true;
    }
  }
  if (!found) {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Pizza added to cart",
    showConfirmButton: false,
    timer: 1000,
  });
}

function closeDelivery() {
  let displayDelivery = document.querySelector(".showDelivery");
  let displayProduct = document.querySelector(".showProduct");
  displayDelivery.classList.add("hidden");
  displayProduct.classList.remove("hidden");
}
function showDelivery() {
  let displayDelivery = document.querySelector(".showDelivery");
  let displayProduct = document.querySelector(".showProduct");
  displayDelivery.classList.remove("hidden");
  displayProduct.classList.add("hidden");
}
