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

// I set up the service in this file, instead of within the app
// so that it can be directly used. For example, it can be
// imported into Login as import {registrarAuth} from '../../firebase/config';
// then within Login, also import {signInWithEmailAndPassword } from "firebase/auth";
// One can then create an auth object (think of it as Context) such as by
// const auth = registrarAuth;
// This can be passed to the firebase function
// signInWithEmailAndPassword(auth, email, password)
// Which is a promise that returns credentials.
// an example use case would then be:
// signInWithEmailAndPassword(auth, email, password)
//      .then( (cred) => {
//        setUser(cred.user) <----- note, I am using my stateful Context trick here!
//      })
//      .catch( error => {
//        const errorCode = error.code;
//        const errorMsg = error.message;
//        throw Error(`${errorCode}: ${errorMsg}`)
//      })
//      .finally( () => navigate('/'));
// Please let me know if you have questions Reader,
// --- Tony
