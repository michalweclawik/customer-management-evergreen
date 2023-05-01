import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdgOep2q4znlteU3a_AX_ruh1ypJ6JvMk",
  authDomain: "customer-management-syst-395e5.firebaseapp.com",
  projectId: "customer-management-syst-395e5",
  storageBucket: "customer-management-syst-395e5.appspot.com",
  messagingSenderId: "354187714884",
  appId: "1:354187714884:web:b90e450230fecc8c90b711",
};

// init firebase

initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

// init firebase storage
const storage = getStorage();

export { db, auth, storage };
