function addCheese() {
  let cheese = document.getElementById("pizzaCheese");
  cheese.classList.toggle("hidden");
}

function addPepperoni() {
  let pepperoni = document.getElementById("pizzaPepperoni");
  pepperoni.classList.toggle("hidden");
}
function addOlives() {
  let olives = document.getElementById("pizzaOlives");
  olives.classList.toggle("hidden");
}

function addMozzarella() {
  let mozzarella = document.getElementById("pizzaMozzarella");
  mozzarella.classList.toggle("hidden");
}

function addPepper() {
  let pepper = document.getElementById("pizzaPepper");
  pepper.classList.toggle("hidden");
}
function addBasil() {
  let basil = document.getElementById("pizzaBasil");
  basil.classList.toggle("hidden");
}

let idProduct = "123456789";
let photo = "./images/margarita.jpeg";
function addToCart() {
  let quantity = 1;
  quantity = Number(quantity);

  let product = {
    idProduct: idProduct,
    title: "My pizza",
    photo: photo,
    price: "10",
    quantity: quantity,
    typeDough: "traditional dough",
    size: "28",
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
