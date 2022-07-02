let data = {
  list: [],
  cart: [],
  databaseURL:
    "https://pizza-demo-cf3fa-default-rtdb.europe-west1.firebasedatabase.app/",
};

async function getData() {
  document.getElementById("loading").classList.remove("hidden");
  let url = data.databaseURL + "list/" + ".json";
  const response = await fetch(url);
  let list = await response.json();
  data.list = list;

  document.getElementById("loading").classList.add("hidden");

  load();
}

function load() {
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
    str += `
    <div class="col col-sm-8 col-md-5 col-lg-4  ">
        
        <div id="list_${i}" style="border:none" class="card displayCard">
        <a class="link-active" href="detalii.html?id=${i}">
          <img id="photo" src="${image}" class=" img-fluid card-img-top" alt="pizza">
        </a>
          <div class="card-body">
            <h5 id="cardTitle" class="card-title">${data.list[i].title}</h5>
            <p id="cardText" class="card-text">${data.list[i].ingredients}</p>
            <p id="typeDough">${data.list[i].typeDough}</p>
            <div class="price-bar">
              <div id="size" class="size">Size:${data.list[i].size}cm</div>
              <div id="price" class="price">Price: ${data.list[i].price}&euro;</div>
            </div>
            <div class="cart-bar">
            <a class="link-active" href="detalii.html?id=${i}"><button style="background-color:#458c7e; border:none;" type="button" class="btn btn-dark ">Details</button></a>
            </div>
          
            
        </div>

        </div>
    </div>`;
  }

  document.getElementById("listLoad").innerHTML = str;
}
