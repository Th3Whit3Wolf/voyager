// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const config = import.meta.env.VITE_REACT_APP_FIREBASE;

// Initialize Firebase
firebase.initializeApp(JSON.parse(config));

// Initialize Firebase Authentication and get a reference to the service
const registrarAuth = firebase.auth();
export default registrarAuth;
