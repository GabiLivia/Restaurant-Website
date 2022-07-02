function displayCart() {
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  let found = false;
  let shoppingCart = document.getElementById("productDisplay");
  let empty = document.getElementById("empty");
  let display = document.querySelector(".container");
  let totalOfProducts = document.getElementById("totalCart");
  let total = 0;
  for (let index of cart) {
    shoppingCart.innerHTML += `
    <a style="text-decoration:none;color:#000;" href="detalii.html?id=${index.idProduct}">
      <div class="rowDisplay">
      <div class="image img-fluid"><img id="pizzaImage" src="${index.photo}" alt="pizza" class="img-fluid"></div>
      <div class="description">
        <div class="description-title"><h4 id="cardTitle">${index.title}</h4></div>
        <div><h6>${index.typeDough}</h6></div>
        <div><h6>Size: <span>${index.size}</span></h6></div>
      </div>
      <div id="quantityInput" class="quantity">
      <div class=btnsQuantity>
      <button onclick="addAmount(event, ${index.idProduct});" id="addon-wrapping"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
      </svg></button>
      <button onclick="reduceAmount(event, ${index.idProduct});" id="addon-wrapping"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
      </svg></button></div>
      <input type="text"  min="1" idProduct="${index.idProduct}" class="quantity" value="${index.quantity}"/>
      </div>
      <div id="priceInfo" class="priceGroup"><h3 class="cartPrice">${index.price}&euro;</h3></div>
      <div class="deleteBTN"><button class="deleteBTN" onclick="deleteBTN(event, ${index.idProduct});">  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg></button></div>
      </div></a>`;
    total += index.quantity * index.price;
    found = true;
  }
  if (!found) {
    empty.innerHTML = `<h2>Cart is empty</h2>
                              <a href="produse.html"><button class="btn btn-dark">Back to Shopping</button></a>`;
    display.classList.add("hidden");
  }
  totalOfProducts.innerHTML = total;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function addAmount(event, product) {
  event.preventDefault();
  console.log(document.querySelector('[idProduct ="' + product + '"]'));
  let quantity = document.querySelector('[idProduct ="' + product + '"]').value;

  quantity = Number(quantity);
  quantity++;
  console.log(quantity, product);
  document.querySelector('[idProduct ="' + product + '"]').value = quantity;

  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  let found = false;
  for (prod of cart) {
    if (prod.idProduct == product) {
      prod.quantity = quantity;
      found = true;

      break;
    }
  }
  if (!found) {
    cos.push({ ...product, quantity: quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.reload();
}

function reduceAmount(event, product) {
  event.preventDefault();
  let quantity = document.querySelector('[idProduct ="' + product + '"]').value;

  quantity = Number(quantity);
  if (quantity == 1) return;
  else {
    quantity--;

    document.querySelector('[idProduct ="' + product + '"]').value = quantity;

    let cart = localStorage.getItem("cart");
    if (cart === null) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    let found = false;
    for (prod of cart) {
      if (prod.idProduct == product) {
        prod.quantity = quantity;
        found = true;

        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.location.reload();
}
function deleteBTN(event, idProduct) {
  event.preventDefault();
  alert("Item will be deleted from cart.");

  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  for (i = 0; i < cart.length; i++) {
    if (idProduct == cart[i].idProduct) {
      cart.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.reload();
}

function placeOrder(event) {
  event.preventDefault();
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  localStorage.clear("cart");

  Swal.fire({
    icon: "success",
    title: "Your order is being processed",
    text: "Delivery time: 90min",
  });
  let empty = document.getElementById("empty");
  let display = document.querySelector(".container");
  empty.innerHTML = `<h2>Cart is empty</h2>
                              <a href="produse.html"><button class="btn btn-dark">Back to Shopping</button></a>`;
  display.classList.add("hidden");
}
