import admin from "firebase-admin";

const { FIREBASE_SERVICE_ACCOUNT } = process.env;
const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

export default admin;
