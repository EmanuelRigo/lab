const accesInputEmail = document.getElementById("accesInputEmail")
const accesInputPassword = document.getElementById("accesInputPassword")
const accesCheckSession = document.getElementById("accesCheckSession")
const accesBtn = document.getElementById("accesBtn")
const acces = document.getElementById("acces")


const patientForm = document.getElementById("patientForm")
const patientFormInputName = document.getElementById("patientFormInputName")
const patientFormInputSurame = document.getElementById("patientFormInputSurname")
const patientFormInputDni = document.getElementById("patientFormInputDni")
const patientFormInputMail = document.getElementById("patientFormInputMail")
const patientFormInputGender = document.getElementById("patientFormInputGender")
const patientFormInputAge = document.getElementById("patientFormInputAge")
const patientFormBtnNext = document.getElementById("patientFormBtnNext")


const analisys = document.getElementById("analisys")
const analisysContainer = document.getElementById("analisysContainer")
const analisysBtnFinish = document.getElementById("analysisBtnFinish")


const talon = document.getElementById("talon")


const usersDB = [{
  "nombreUsuario": "maira.lab",
  "nombre": "maira",
  "apellido": "lopez",
  "password": "8787",
}]


function cambiarEstado(activate,
  deactivate) {
  activate.classList.toggle("d-none");
  deactivate.classList.toggle("d-none");
}

function validarUsuario(array, user, pass) {
  let encontrado = array.find((array) => array.nombreUsuario == user)

  if (typeof encontrado == "undefined") {
    return false;
  } else {
    if (encontrado.password != pass) {
      return false
    } else {
      return encontrado
    }
  }
}

function guardarUsuario(datos, storage) {
  const userStorage = {
    username: datos.nombreUsuario,
    name: datos.nombre,
    surname: datos.apellido,
    password: datos.password
  }

  storage.setItem("usuario", JSON.stringify(userStorage))
}

accesBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!accesInputEmail.value || !accesInputPassword.value) {
    alert("por favor llene los campos")
  } else {
    let data = validarUsuario(usersDB, accesInputEmail.value, accesInputPassword.value)
    console.log(data)

    if (!data) { alert("contraseña o mail incorrecto") } else {
      if (accesCheckSession.checked) {
        alert("ingreso exitoso")
        cambiarEstado(acces, patientForm)
        guardarUsuario(data, localStorage)
      } else {
        alert("ingreso exitoso")
        cambiarEstado(acces, patientForm)
        guardarUsuario(data, sessionStorage)
      }
    }
  }
}
)


function recuperarUsuario(storage) {
  let usuarioStorage = JSON.parse(storage.getItem("usuario"));
  return usuarioStorage;
}

function estaLogueado(usuario) {
  if (usuario) {
    cambiarEstado(acces, patientForm);
  }
}


//////Funciones de Pacientes///////


let patientDB = [];

class Patient {
  constructor(name, surname, dni, email, gender, age, analysis) {
    this.name = name;
    this.surname = surname;
    this.dni = dni;
    this.email = email;
    this.gender = gender;
    this.age = age;
    this.analysis = analysis
  }
}

function sumarPaciente() {
  patientDB.push(
    new Patient(
      patientFormInputName.value,
      patientFormInputSurame.value,
      patientFormInputDni.value,
      patientFormInputMail.value,
      patientFormInputGender.value,
      patientFormInputAge.value,
      analisisSumados
    )
  )
  console.log(patientDB[0])
  cambiarEstado(analisys, talon)
}

patientFormBtnNext.addEventListener("click", (e) => { e.preventDefault(); cambiarEstado(patientForm, analisys) })

/////////Funciones de Analisis/////////

const urlArchivoJSON = new Request("analisis.json");
let analisisDB = []
fetch(urlArchivoJSON)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al conseguir los datos.');
    }
    return response.json();
  })
  .then(data => {
    analisisDB = analisisDB.concat(data);
    cardsAnalisis(analisisDB, analisysContainer)
  })
  .catch(error => {
    console.error('Error:', error);
  });

let analisisSumados = []

function cardsAnalisis(array, container) {
  container.innerHTML = "";
  for (item of array) {
    let card = document.createElement("div");
    card.className = "col d-flex justify-content-center";
    card.id = item.nombre;
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
    <button type="button" data-filter="${item.nombre}" class="btn btn-info analisysBtnAdd">Agregar</button>
    <button type="button" class="btn btn-warning analisysBtnRemove">Quitar</button>
    </div>
  </div>`
    container.append(card);
  }

  /********////////pasar a funciones asincronas////////******/

  const analisysBtnAdd = document.querySelectorAll(".analisysBtnAdd")
  const analisysCard = document.querySelectorAll(".col")

  analisysBtnAdd.forEach((btn) => {
    btn.addEventListener(("click"), () => { sumarAnalisis(btn.dataset.filter) })
  })


  function sumarAnalisis(analisis) {
    if (analisis.dataset === analisisDB.nombre) {
      function isTrue(estudio) {
        return estudio.nombre === analisis;
      }

      analisisSumados.push(analisisDB.find(isTrue))
    } else {
      return console.log("chau")
    }

    console.log(analisisSumados)
  }

  ///////////////////////////////////////////////
}



analisysBtnFinish.addEventListener("click", sumarPaciente)


window.onload = () => estaLogueado(recuperarUsuario(localStorage));
