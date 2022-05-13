// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	// apiKey:
	// authDomain:
	// projectId:
	// storageBucket:
	// messagingSenderId:
	// appId:
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Service
const registrarAuth = firebase.auth();

export { registrarAuth };
