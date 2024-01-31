import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1J-oZPDphpJ9wlQ4qBe8lFEYxSdu_6ko",
  authDomain: "imagenes-e-techstore.firebaseapp.com",
  projectId: "imagenes-e-techstore",
  storageBucket: "imagenes-e-techstore.appspot.com",
  messagingSenderId: "340546095829",
  appId: "1:340546095829:web:ac6e4ebc052666e2bc705c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const savePatient = (patient) =>
  addDoc(collection(db, "patients"), { patient });

export const getAnalysis2 = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "analysis"));

    // Obtener un array con los datos de los documentos
    const dataArray = querySnapshot.docs.map((doc) => doc.data());

    // Imprimir el array de datos
    console.log("Array de datos:", dataArray);

    return dataArray; // Puedes retornar el array si es necesario
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

/* 
export const getAnalysis2 = () => getDocs(collection(db, "analysis")); */
