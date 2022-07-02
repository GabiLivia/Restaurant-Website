let data = {
  list: [],
  cart: [],
  idxE: null,
  databaseURL:
    "https://pizza-demo-cf3fa-default-rtdb.europe-west1.firebasedatabase.app/",
};

async function getData() {
  let url = data.databaseURL + "list/" + ".json";
  const response = await fetch(url);
  let list = await response.json();
  data.list = list;

  load();
}

function load() {
  let search = document.getElementById("searchField").value;
  let str = "";
  for (let [i, product] of Object.entries(data.list)) {
    if (product === null) {
      continue;
    }

    let image;
    if (data.list[i].photo === undefined) {
      image =
        "https://gfsstore.com/wp-content/themes/gfsstore.com/images/no_image_available.png";
    } else {
      image = data.list[i].photo;
    }
    if (
      product.ingredients.includes(search) ||
      product.title.includes(search) ||
      product.typeDough.includes(search)
    ) {
      str += `
      <tr>
        <th id="productItem" scope="row"></th>
        <td class="searchWord">${data.list[i].title}</td>
        <td class="searchWord">${data.list[i].typeDough}</td>
        <td class="searchWord">${data.list[i].ingredients}</td>
        <td>${data.list[i].size}<span>cm</span></td>
        <td>${data.list[i].price}<span>&euro;</span></td>
        <td> <a class="link-active" href="#"><img style="max-width:3rem;"src="${image}" class="img-fluid card-img img-fluid" alt="pizza"></a></td>
        <td><button type="button" onclick="editProduct('${i}', event);" class="btn btn-dark">Edit</button></td>
        <td><button type="button" onclick="deleteProduct('${i}', event);" class="btn btn-danger">Delete</button></td>
      </tr>
     `;
    }
  }
  document.getElementById("listLoad").innerHTML = str;
}
async function addProduct(event) {
  event.preventDefault();
  let title = document.getElementById("inputName").value;
  let ingredients = document.getElementById("inputIngredients").value;
  let typeOfDough = document.getElementById("inputGroup").value;
  let sizePizza = document.getElementById("inputSize").value;
  let pricePizza = document.getElementById("inputPrice").value;
  let photo = document.getElementById("inputPhoto").value;

  if (data.idxE === null) {
    let url = data.databaseURL + "list/" + ".json";
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        ingredients: ingredients,
        typeDough: typeOfDough,
        size: sizePizza,
        price: pricePizza,
        photo: photo,
      }),
    });
  } else {
    let url = data.databaseURL + "list/" + data.idxE + "/" + ".json";
    let response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        ingredients: ingredients,
        typeDough: typeOfDough,
        size: sizePizza,
        price: pricePizza,
        photo: photo,
      }),
    });
    data.idxE = null;
  }

  let checkInput = document.getElementById("gridCheck");
  if (checkInput.checked == true) {
    await getData();
    clearForm();
  } else {
    alert("You need to check box if you want to continue");
    return;
  }
}
function clearForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputIngredients").value = "";
  document.getElementById("inputGroup").value = "";
  document.getElementById("inputSize").value = "";
  document.getElementById("inputPrice").value = "";
  document.getElementById("inputPhoto").value = "";
}

async function deleteProduct(idx, event) {
  event.preventDefault();
  if (
    confirm(
      `The product with ${data.list[idx].title} name will be deleted. Please confirm.`
    )
  ) {
    let url = `https://pizza-demo-cf3fa-default-rtdb.europe-west1.firebasedatabase.app/list/${idx}/.json`;
    let response = await fetch(url, {
      method: "DELETE",
    });
    await getData();
  }
}

function editProduct(idx, event) {
  event.preventDefault();
  let product = data.list[idx];
  document.getElementById("inputName").value = product.title;
  document.getElementById("inputIngredients").value = product.ingredients;
  document.getElementById("inputGroup").value = product.typeDough;
  document.getElementById("inputSize").value = product.size;
  document.getElementById("inputPrice").value = product.price;

  data.idxE = idx;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
