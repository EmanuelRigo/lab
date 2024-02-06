import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1J-oZPDphpJ9wlQ4qBe8lFEYxSdu_6ko",
  authDomain: "imagenes-e-techstore.firebaseapp.com",
  projectId: "imagenes-e-techstore",
  storageBucket: "imagenes-e-techstore.appspot.com",
  messagingSenderId: "340546095829",
  appId: "1:340546095829:web:ac6e4ebc052666e2bc705c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const getAnalysis = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "analysis"));
    const dataArray = querySnapshot.docs.map((doc) => doc.data());
    return dataArray;
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    throw error;
  }
};

export const savePatient = async (
  name,
  surname,
  dni,
  phone,
  gender,
  age,
  analysis
) => {
  try {
    const docRef = await addDoc(collection(db, "patients"), {
      name,
      surname,
      dni,
      phone,
      gender,
      age,
      analysis,
    });

    const idGenerado = docRef.id;
    return idGenerado;
  } catch (error) {
    console.error("Error al añadir el documento:", error);
    throw error;
  }
};

export const getPatient = (id) => getDoc(doc(db, "patients", id));

export const onGetPatient = (callback) =>
  onSnapshot(collection(db, "patients"), callback);
