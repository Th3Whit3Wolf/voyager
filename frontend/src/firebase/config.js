// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env
		.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const registrarAuth = firebase.auth();
export default registrarAuth;
