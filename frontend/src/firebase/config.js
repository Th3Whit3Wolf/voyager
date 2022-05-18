// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB_Ph-X_XyXlLN7fjyJhoiS73bZs-o-rfU",
  authDomain: "bsdi-capstone.firebaseapp.com",
  projectId: "bsdi-capstone",
  storageBucket: "bsdi-capstone.appspot.com",
  messagingSenderId: "831411631880",
  appId: "1:831411631880:web:32bf1f0ede9a30e146debd"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const registrarAuth = firebase.auth();
export default registrarAuth;
