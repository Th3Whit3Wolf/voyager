import admin from "firebase-admin";

const { FIREBASE_VOYAGER_SERVICE_ACCOUNT } = process.env;

admin.initializeApp({
	credential: admin.credential.cert(
		JSON.parse(FIREBASE_VOYAGER_SERVICE_ACCOUNT)
	)
});

export default admin;
