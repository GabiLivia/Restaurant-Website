async function getData() {
  let url =
    "https://pizza-demo-cf3fa-default-rtdb.europe-west1.firebasedatabase.app/messages/.json";
  const response = await fetch(url);
  let list = await response.json();
  data.list = list;
}

async function sendMessage(event) {
  event.preventDefault();
  let name = document.getElementById("floatingNameGrid").value;
  let email = document.getElementById("floatingInputGrid").value;
  let message = document.getElementById("floatingTextarea2").value;

  let url =
    "https://pizza-demo-cf3fa-default-rtdb.europe-west1.firebasedatabase.app/messages/.json";
  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
    }),
  });
  clearForm();
}
function clearForm() {
  document.getElementById("floatingNameGrid").value = "";
  document.getElementById("floatingInputGrid").value = "";
  document.getElementById("floatingTextarea2").value = "";
}
