const accesInputEmail = document.getElementById("accesInputEmail")
const accesInputPassword = document.getElementById("accesInputPassword")
const accesCheckSession = document.getElementById("accesCheckSession")
const accesBtn = document.getElementById("accesBtn")
const acces = document.getElementById("acces")
const formPatientAnalisisTalon = document.getElementById("formPatientAnalisisTalon")

const patientFormContainer = document.getElementById("patientFormContainer")
const patientForm = document.getElementById("patientForm")
const patientFormInputName = document.getElementById("patientFormInputName")
const patientFormInputSurame = document.getElementById("patientFormInputSurname")
const patientFormInputDni = document.getElementById("patientFormInputDni")
const patientFormInputMail = document.getElementById("patientFormInputMail")
const patientFormInputGender = document.getElementById("patientFormInputGender")
const patientFormInputAge = document.getElementById("patientFormInputAge")
const patientFormBtnNext = document.getElementById("patientFormBtnNext")
const patientFormWelcome = document.getElementById("patientFormWelcome")

const analysis = document.getElementById("analisys")
const analysisContainer = document.getElementById("analysisContainer")
const analisysBtnFinish = document.getElementById("analysisBtnFinish")
const analysisBtnBack = document.getElementById("analysisBtnBack")

const talonContainer = document.getElementById("talonContainer")
const talon = document.getElementById("talon")
const talonBtnAddPatient = document.getElementById("talonBtnAddPatient")

const patientListContainer = document.getElementById("patientListContainer")
const patientList = document.getElementById("patientList")

const signOff = document.getElementById("signOff")



const usersDB = [{
  "nombreUsuario": "maira.lab",
  "nombre": "Maira",
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

    if (!data) { alert("contraseña o mail incorrecto") } else {
      if (accesCheckSession.checked) {
        alert("ingreso exitoso")
        cambiarEstado(acces, formPatientAnalisisTalon)
        guardarUsuario(data, localStorage)
        saludar(recuperarUsuario(localStorage).name)
      } else {
        alert("ingreso exitoso")
        cambiarEstado(acces, formPatientAnalisisTalon)
        guardarUsuario(data, sessionStorage)
        saludar(recuperarUsuario(sessionStorage).name)
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
    cambiarEstado(acces, formPatientAnalisisTalon);
    saludar(recuperarUsuario(localStorage).name)
  }
}


//////Funciones de Pacientes///////


let patientDB = [];

class Patient {
  constructor(name, surname, dni, tel, gender, age, analysis) {
    this.name = name;
    this.surname = surname;
    this.dni = dni;
    this.tel = tel;
    this.gender = gender;
    this.age = age;
    this.analysis = analysis
  }
}

function saludar(usuario) {
  patientFormWelcome.innerHTML = `Bienvenido ${usuario}`
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
  cambiarEstado(analisys, talonContainer)
  talonPaciente(talon)
}

patientFormBtnNext.addEventListener("click", (e) => { e.preventDefault(); cambiarEstado(patientFormContainer, analisys) })

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
    cardsAnalisis(analisisDB, analysisContainer)
  })
  .catch(error => {
    console.error('Error:', error);
  });

let analisisSumados = []

function cardsAnalisis(array, container) {
  container.innerHTML = "";
  for (item of array) {
    let card = document.createElement("div");
    card.className = "analysis__card";
    card.id = item.nombre;
    card.innerHTML = `  <div class="analysis__card-titulo ${item.agregado == false ? "" : "analysis__card-titulo-agregado"}">
    <h5>${item.nombre} </h5>
  </div>
  <div>
    <div class="analysis__card-price">
        <p>precio: $${item.precio} </p>
        <p>dias: ${item.tiempo} </p>
    </div>
    </div>
    <button type="button" data-filter="${item.nombre}" class="analysis__card-btn">${item.agregado == false ? "agregar" : "eliminar"} </button>`
    container.append(card);

    const analisysBtnAdd = document.querySelectorAll(".analysis__card-btn")
  }



  /********////////pasar a funciones asincronas////////******/

  const analisysBtnAdd = document.querySelectorAll(".analysis__card-btn")

  analisysBtnAdd.forEach((btn) => {
    btn.addEventListener(("click"), () => { agregarAnalisis(btn.dataset.filter) })
  })

  function agregarAnalisis(analisis) {
    if (analisis.dataset === analisisDB.nombre) {
      function isTrue(estudio) {
        return estudio.nombre === analisis;
      }

      if (analisisDB.find(isTrue).agregado == true) {
        analisisDB.find(isTrue).agregado = false
      } else { analisisDB.find(isTrue).agregado = true }
      cardsAnalisis(analisisDB, analysisContainer)

      analisisSumados = analisisDB.filter((analisis) => analisis.agregado === true)
    } else {
      return console.log("algo salio mal")
    }

  }

  ///////////////////////////////////////////////
}

/////////Funciones de Talon/////////

function talonPaciente(container) {
  container.innerHTML = ''
  container.innerHTML = `<div class="talon_card card mb-3">
  <div class="card-header bg-transparent border-success">
    identificador de analisis #${patientDB.length + patientDB[0].dni}
  </div>
  <div class="talon_card-body">
    <h5 class="card-title">${patientDB[patientDB.length - 1].name + ' ' + patientDB[patientDB.length - 1].surname}</h5>
    <p>genero: ${patientDB[0].gender} </p>
    <p>Edad: ${patientDB[0].age}</p>
    <p class="card-text">dni: ${patientDB[0].dni}</p>
    <p>tel: ${patientDB[0].tel}</p>
  </div>
  <div class="card-footer bg-transparent border-success">
    <table class="talon-table table caption-top">
      <thead >
        <tr>
          <th scope="col">Analisis</th>
          <th scope="col">Dias</th>
          <th scope="col">Precio</th>
        </tr>
      </thead>
      <tbody id="talon__tbody">
      </tbody>
    </table>
  </div>
</div>`

  for (item of patientDB[patientDB.length - 1].analysis) {
    const talonThead = document.getElementById("talon__tbody")
    let trAnalysis = document.createElement("tr")

    trAnalysis.innerHTML = `<td>${item.nombre}</td>
    <td>${item.tiempo}</td>
    <td>${item.precio}</td>`

    talonThead.append(trAnalysis)
  }
}

function analisysListFalse(array) {
  array.forEach(objeto => {
    objeto.agregado = false;
  });
  cardsAnalisis(analisisDB, analysisContainer)
}

talonBtnAddPatient.addEventListener("click", () => {
  patientForm.reset();
  cambiarEstado(talonContainer, patientFormContainer)
  analisysListFalse(analisisDB)
  console.log(patientDB)
})

analysisBtnBack.addEventListener("click", () => { cambiarEstado(analysis, patientFormContainer) })

signOff.addEventListener("click", cerrarSession)


function cerrarSession() {
  analisysListFalse(analisisDB)
  localStorage.clear();
  sessionStorage.clear();
  patientFormContainer.classList.remove("d-none")
  analisys.classList.add("d-none")
  talon.classList.add("d-none")
  talon.innerHTML = ''
  cambiarEstado(acces, formPatientAnalisisTalon)
}

analisysBtnFinish.addEventListener("click", sumarPaciente)


window.onload = () => estaLogueado(recuperarUsuario(localStorage));
