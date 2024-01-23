const accesInputEmail = document.getElementById("accesInputEmail");
const accesInputPassword = document.getElementById("accesInputPassword");
const accesCheckSession = document.getElementById("accesCheckSession");
const accesBtn = document.getElementById("accesBtn");
const acces = document.getElementById("acces");
const formPatientAnalisisTalon = document.getElementById(
  "formPatientAnalisisTalon"
);

const patientFormContainer = document.getElementById("patientFormContainer");
const patientForm = document.getElementById("patientForm");
const patientFormInputName = document.getElementById("patientFormInputName");
const patientFormInputSurame = document.getElementById(
  "patientFormInputSurname"
);
const patientFormInputDni = document.getElementById("patientFormInputDni");
const patientFormInputMail = document.getElementById("patientFormInputMail");
const patientFormInputGender = document.getElementById(
  "patientFormInputGender"
);
const patientFormInputAge = document.getElementById("patientFormInputAge");
const patientFormBtnNext = document.getElementById("patientFormBtnNext");
const patientFormWelcome = document.getElementById("patientFormWelcome");

const analysis = document.getElementById("analisys");
const analysisContainer = document.getElementById("analysisContainer");
const analisysBtnFinish = document.getElementById("analysisBtnFinish");
const analysisBtnBack = document.getElementById("analysisBtnBack");

const talonContainer = document.getElementById("talonContainer");
const talon = document.getElementById("talon");
const talonBtnAddPatient = document.getElementById("talonBtnAddPatient");

const patientListContainer = document.getElementById("patientListContainer");
const patientItemContainer = document.getElementById("accordionFlushExample");
const patientList = document.getElementById("patientList");

const patientListBtn = document.getElementById("patientListBtn");
const patientFormBtn = document.getElementById("patientFormBtn");
const signOff = document.getElementById("signOff");

const sinPacientes = document.getElementById("sinPacientes");

function toCapitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function numberToWords(number) {
  const units = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (number < 20) {
    return units[number];
  } else if (number < 100) {
    return (
      tens[Math.floor(number / 10)] +
      (number % 10 !== 0 ? " " + units[number % 10] : "")
    );
  } else if (number < 1000) {
    return (
      units[Math.floor(number / 100)] +
      " hundred" +
      (number % 100 !== 0 ? " and " + numberToWords(number % 100) : "")
    );
  } else if (number < 1000000) {
    return (
      numberToWords(Math.floor(number / 1000)) +
      " thousand" +
      (number % 1000 !== 0 ? " " + numberToWords(number % 1000) : "")
    );
  } else if (number < 1000000000) {
    return (
      numberToWords(Math.floor(number / 1000000)) +
      " million" +
      (number % 1000000 !== 0 ? " " + numberToWords(number % 1000000) : "")
    );
  } else {
    return "Number too large to convert";
  }
}

function listaPacientes(array, container) {
  container.innerHTML = "";
  if (array.length === 0) {
    console.log("no hay pacientes");
    let patientItem = document.createElement("div");
    patientItem.innerHTML = ` <div>no hay pacientes</div> `;
    container.append(patientItem);
  } else {
    for (item of array) {
      let patientItem = document.createElement("div");
      patientItem.className = "accordion-item";
      patientItem.innerHTML = `  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${toCapitalize(
        numberToWords(item.id).replace(/\s+/g, "")
      )}" aria-expanded="false" aria-controls="flush-collapse${toCapitalize(
        numberToWords(item.id).replace(/\s+/g, "")
      )}">
        ${item.name + " " + item.surname}
      </button>
    </h2>
    <div id="flush-collapse${toCapitalize(
      numberToWords(item.id).replace(/\s+/g, "")
    )}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div name="${item.id}" class="accordion-body"></div>
    </div>
  </div>`;
      container.append(patientItem);

      const itemAnalysis = document.getElementsByName(item.id);
      for (item1 of itemAnalysis) {
        for (item2 of item.analysis) {
          const itemP = document.createElement("p");
          itemP.innerHTML = `${item2.nombre}`;
          item1.append(itemP);
        }
      }
    }
  }
}

patientListBtn.addEventListener("click", () => {
  analysis.classList.add("d-none");
  talonContainer.classList.add("d-none");
  patientFormContainer.classList.add("d-none");
  talonContainer.classList.add("d-none");
  patientListBtn.classList.add("d-none");
  patientListContainer.classList.remove("d-none");
  patientFormBtn.classList.remove("d-none");
  listaPacientes(patientDB, patientItemContainer);
  patientFormBtnNext.classList.add("d-none");
  analysisBtnBack.classList.add("d-none");
  analisysBtnFinish.classList.add("d-none");
  talonBtnAddPatient.classList.add("d-none");
});

patientFormBtn.addEventListener("click", () => {
  cambiarEstado(patientFormContainer, patientListContainer);
  cambiarEstado(patientFormBtn, patientListBtn);
  patientFormBtnNext.classList.remove("d-none");
});

const usersDB = [
  {
    nombreUsuario: "maira.lab",
    nombre: "Maira",
    apellido: "lopez",
    password: "8787",
  },
];

function cambiarEstado(activate, deactivate) {
  activate.classList.toggle("d-none");
  deactivate.classList.toggle("d-none");
}

function validarUsuario(array, user, pass) {
  let encontrado = array.find((array) => array.nombreUsuario == user);

  if (typeof encontrado == "undefined") {
    return false;
  } else {
    if (encontrado.password != pass) {
      return false;
    } else {
      return encontrado;
    }
  }
}

function guardarUsuario(datos, storage) {
  const userStorage = {
    username: datos.nombreUsuario,
    name: datos.nombre,
    surname: datos.apellido,
    password: datos.password,
  };

  storage.setItem("usuario", JSON.stringify(userStorage));
}

accesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!accesInputEmail.value || !accesInputPassword.value) {
    Swal.fire({
      heightAuto: false,
      icon: "error",
      title: "Por favor llene todos los campos",
      timer: 2000,
      backdrop: false,
      customClass: {
        popup: "my-custom-popup-class",
      },
    });
  } else {
    let data = validarUsuario(
      usersDB,
      accesInputEmail.value,
      accesInputPassword.value
    );

    if (!data) {
      Swal.fire({
        heightAuto: false,
        icon: "error",
        title: "Mail o contraseña incorrectos",
        timer: 2000,
      });
    } else {
      if (accesCheckSession.checked) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ingreso exitoso",
          showConfirmButton: false,
          timer: 2500,
          backdrop: false,
          customClass: {
            popup: "my-custom-popup-class",
          },
        });

        cambiarEstado(acces, formPatientAnalisisTalon);
        guardarUsuario(data, localStorage);
        saludar(recuperarUsuario(localStorage).name);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ingreso exitoso",
          showConfirmButton: false,
          timer: 2500,
          backdrop: false,
          customClass: {
            popup: "my-custom-popup-class",
          },
        });
        cambiarEstado(acces, formPatientAnalisisTalon);
        guardarUsuario(data, sessionStorage);
        saludar(recuperarUsuario(sessionStorage).name);
      }
    }
  }
});

function recuperarUsuario(storage) {
  let usuarioStorage = JSON.parse(storage.getItem("usuario"));
  return usuarioStorage;
}

function estaLogueado(usuario) {
  if (usuario) {
    cambiarEstado(acces, formPatientAnalisisTalon);
    saludar(recuperarUsuario(localStorage).name);
  }
}

//////Funciones de Pacientes///////

let patientDB = [];

class Patient {
  constructor(name, surname, dni, tel, gender, age, analysis, id) {
    this.name = name;
    this.surname = surname;
    this.dni = dni;
    this.tel = tel;
    this.gender = gender;
    this.age = age;
    this.analysis = analysis;
    this.id = id;
  }
}

function saludar(usuario) {
  patientFormWelcome.innerHTML = `Hola ${usuario}`;
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
      analisisSumados,
      patientDB.length + 1
    )
  );
  cambiarEstado(analisys, talonContainer);
  talonPaciente(talon);
}

patientFormInputMail.addEventListener("input", function () {
  if (this.value.includes("e")) {
    this.value = this.value.replace("e", "");
  }
});

function validarCampos() {
  if (
    patientFormInputName.value.length === 0 ||
    patientFormInputSurame.value.length === 0 ||
    patientFormInputDni.value.length === 0 ||
    patientFormInputMail.value.length === 0 ||
    patientFormInputGender.value.length === 0 ||
    patientFormInputAge.value.length === 0
  ) {
    Swal.fire({
      heightAuto: false,
      icon: "warning",
      title: "Llene todos los campos",
      timer: 2500,
      showConfirmButton: false,
      backdrop: false,
      customClass: {
        popup: "my-custom-popup-class",
      },
    });
  } else {
    cambiarEstado(patientFormContainer, analisys);
    patientFormBtnNext.classList.add("d-none");
    analysisBtnBack.classList.remove("d-none");
    analisysBtnFinish.classList.remove("d-none");
  }
}

patientFormBtnNext.addEventListener("click", (e) => {
  e.preventDefault();
  validarCampos();
});

/////////Funciones de Analisis/////////
let analisisDB = [];

const getAnalysis = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fetch("analisis.json"));
    }, 100);
  });
};

async function consiguiendoDatos() {
  const respuesta = await getAnalysis();
  analisisDB = await respuesta.json();
  cardsAnalisis(analisisDB, analysisContainer);
}

consiguiendoDatos();

let analisisSumados = [];

function cardsAnalisis(array, container) {
  container.innerHTML = "";

  for (item of array) {
    let card = document.createElement("div");
    card.className = "col";
    card.id = item.nombre;
    card.innerHTML = `<div class="row ${
      item.agregado == false ? "" : "analysis__card-titulo-agregado"
    }"> 
    <div class="col-6 col-md-12 d-flex align-items-center"><h6 class="m-0 my-md-3 ">${
      item.nombre
    } </h6></div>
    <div class="col-5 bg-danger col-md-12 d-flex d-lg-block"> <p class="px-1 p-md-0"> <span class="d-none d-lg-block">precio: </span>$${
      item.precio
    } </p> <p>dias: ${item.tiempo} </p></div>
    <div class="col-1 bg-warning col-md-12"><button type="button" data-filter="${
      item.nombre
    }" class="analysis__card-btn">${
      item.agregado == false
        ? `<span class="d-none d-lg-block">agregar</span> <i class="bi bi-clipboard-plus"></i>`
        : `<span class="d-none d-lg-block">remover</span> <i class="bi bi-clipboard-x"></i>`
    } </button</div>`;
    container.append(card);
  }
  /*   for (item of array) {
    let card = document.createElement("div");
    card.className = "analysis__card";
    card.id = item.nombre;
    card.innerHTML = `  <div class="analysis__card-titulo ${
      item.agregado == false ? "" : "analysis__card-titulo-agregado"
    }">
    <h5>${item.nombre} </h5>
  </div>
  <div>
    <div class="analysis__card-price">
        <p>precio: $${item.precio} </p>
        <p>dias: ${item.tiempo} </p>
    </div>
    </div>
    <button type="button" data-filter="${
      item.nombre
    }" class="analysis__card-btn">${
      item.agregado == false ? "agregar" : "eliminar"
    } </button>`;
    container.append(card);
  } */

  /********/ ///////pasar a funciones asincronas////////******/

  const analisysBtnAdd = document.querySelectorAll(".analysis__card-btn");

  analisysBtnAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      agregarAnalisis(btn.dataset.filter);
    });
  });

  function agregarAnalisis(analisis) {
    if (analisis.dataset === analisisDB.nombre) {
      function isTrue(estudio) {
        return estudio.nombre === analisis;
      }

      if (analisisDB.find(isTrue).agregado == true) {
        analisisDB.find(isTrue).agregado = false;
      } else {
        analisisDB.find(isTrue).agregado = true;
      }
      cardsAnalisis(analisisDB, analysisContainer);

      analisisSumados = analisisDB.filter(
        (analisis) => analisis.agregado === true
      );
    } else {
      return console.log("algo salio mal");
    }
  }

  ///////////////////////////////////////////////
}

/////////Funciones de Talon/////////

function talonPaciente(container) {
  let precioTotal = 0;
  const sumarPrecios = analisisSumados.map((item1) => item1.precio);
  for (let i = 0; i < sumarPrecios.length; i++) precioTotal += sumarPrecios[i];

  const cantidadDias = analisisSumados.map((item1) => item1.tiempo);
  let diasTotal = Math.max(...cantidadDias);

  container.innerHTML = "";
  container.innerHTML = `<div class="talon_card row">
  <div class="talon_card-body col-md-6">
  <div class="talon__number-id">
    identificador de analisis #${
      patientDB.length + patientDB[patientDB.length - 1].dni
    }
  </div>
    <h5 class="talon__name">${
      patientDB[patientDB.length - 1].name +
      " " +
      patientDB[patientDB.length - 1].surname
    }</h5>
    <p>Genero: ${patientDB[patientDB.length - 1].gender} </p>
    <p>Edad: ${patientDB[patientDB.length - 1].age}</p>
    <p class="card-text">Dni: ${patientDB[patientDB.length - 1].dni}</p>
    <p>Tel: ${patientDB[patientDB.length - 1].tel}</p>
  </div>
  <div class="col-md-6">
    <table class="talon-table table caption-top">
      <thead>
        <tr>
          <th class="talon__th" scope="col">Analisis</th>
          <th class="talon__th" scope="col">Dias</th>
          <th class="talon__th" scope="col">Precio</th>
        </tr>
      </thead>
      <tbody id="talon__tbody">
      </tbody>
      <thead class="padding-tabla">
      <tr class="table-secondary">
        br
        <th scope="col">Total</th>
        <th scope="col">${diasTotal} </th>
        <th scope="col">${precioTotal} </th>
      </tr>
      </thead>
    </table> 
  </div>
</div>`;

  for (item of patientDB[patientDB.length - 1].analysis) {
    const talonThead = document.getElementById("talon__tbody");
    let trAnalysis = document.createElement("tr");

    trAnalysis.innerHTML = `<td>${item.nombre}</td>
    <td>${item.tiempo}</td>
    <td>${item.precio}</td>`;

    talonThead.append(trAnalysis);
  }
}

function analisysListFalse(array) {
  array.forEach((objeto) => {
    objeto.agregado = false;
  });
  cardsAnalisis(analisisDB, analysisContainer);
}

talonBtnAddPatient.addEventListener("click", () => {
  cambiarEstado(talonContainer, patientFormContainer);
  analisysListFalse(analisisDB);
  console.log(patientDB);
  patientFormBtnNext.classList.remove("d-none");
  talonBtnAddPatient.classList.add("d-none");
});

analysisBtnBack.addEventListener("click", () => {
  cambiarEstado(analysis, patientFormContainer);
  patientFormBtnNext.classList.remove("d-none");
  analysisBtnBack.classList.add("d-none");
  analisysBtnFinish.classList.add("d-none");
});

signOff.addEventListener("click", cerrarSession);

function cerrarSession() {
  analisysListFalse(analisisDB);
  localStorage.clear();
  sessionStorage.clear();
  patientFormContainer.classList.remove("d-none");
  analisys.classList.add("d-none");
  talonContainer.classList.add("d-none");
  talon.innerHTML = "";
  cambiarEstado(acces, formPatientAnalisisTalon);
  patientListBtn.classList.remove("d-none");
  patientFormBtn.classList.add("d-none");
  patientListContainer.classList.add("d-none");
  analisysBtnFinish.classList.add("d-none");
  analysisBtnBack.classList.add("d-none");
  patientFormBtnNext.classList.remove("d-none");
  patientForm.reset();
}

analisysBtnFinish.addEventListener("click", () => {
  if (analisisSumados == 0) {
    Swal.fire({
      heightAuto: false,
      icon: "warning",
      title: "Agregue almenos un analisis",
      timer: 2000,
    });
  } else {
    sumarPaciente();
    analysisBtnBack.classList.add("d-none");
    analisysBtnFinish.classList.add("d-none");
    talonBtnAddPatient.classList.remove("d-none");
    patientForm.reset();
    analisisSumados = [];
    analisysListFalse(analisisDB);
    console.log(analisisSumados);
    Swal.fire({
      heightAuto: false,
      icon: "success",
      title: "Paciente agregado",
      timer: 2500,
      backdrop: false,
      customClass: {
        popup: "my-custom-popup-class",
      },
    });
  }
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage));
