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

export const getAnalysis2 = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "analysis"));
    const dataArray = querySnapshot.docs.map((doc) => doc.data());
    console.log("Array de datos:", dataArray);

    return dataArray;
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    throw error;
  }
};

export const savePatient = (name, surname, dni, mail, gender, age, analysis) =>
  addDoc(collection(db, "patients"), {
    name,
    surname,
    dni,
    mail,
    gender,
    age,
    analysis,
  });

export const onGetPatient = (callback) =>
  onSnapshot(collection(db, "patients"), callback);

/* 
export const getAnalysis2 = () => getDocs(collection(db, "analysis")); */
