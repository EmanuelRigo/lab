const accesInputEmail = document.getElementById("accesInputEmail")
const accesInputPassword = document.getElementById("accesInputPassword")
const accesCheckSession = document.getElementById("accesCheckSesion")


const analisisContainer = document.getElementById("analisis-container")



function hola() {
  alert("hola")
}

accesInputEmail.addEventListener("click", hola)
accesInputPassword.addEventListener("click", hola)

function cardsAnalisis(array, container) {
  container.innerHTML = "";
  for (item of array) {
    let card = document.createElement("div");
    card.className = "col d-flex justify-content-center";
    card.id = item.id;
    card.innerHTML = `
    <div class="card tarjeta">
      <div class="card-body">
       <h5 class="card-title">${item.nombre} </h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Precio: $${item.precio}</li>
      <li class="list-group-item">Demora: ${item.tiempo} dias </li>
    </ul>
    <div class="card-body">
    <button type="button" class="btn btn-info">Agregar</button>
    <button type="button" class="btn btn-warning">Quitar</button>
    </div>
  </div>`
    container.append(card);
  }
}


const urlArchivoJSON = new Request("analisis.json");
let analisis = []
fetch(urlArchivoJSON)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al conseguir los datos.');
    }
    return response.json();
  })
  .then(data => {
    analisis = analisis.concat(data);
    cardsAnalisis(analisis, analisisContainer)
  })
  .catch(error => {
    console.error('Error:', error);
  });
