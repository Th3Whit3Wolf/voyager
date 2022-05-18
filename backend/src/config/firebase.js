import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { FIREBASE_VOYAGER_SERVICE_ACCOUNT, IS_HEROKU } = process.env;

admin.initializeApp({
	credential: admin.credential.cert(
		IS_HEROKU === undefined
			? JSON.parse(FIREBASE_VOYAGER_SERVICE_ACCOUNT)
			: require("/app/src/config/accountService.json")
	)
});

export default admin;

/*
const { FIREBASE_VOYAGER_SERVICE_ACCOUNT } = process.env;

admin.initializeApp({
	credential: admin.credential.cert(
		JSON.parse(FIREBASE_VOYAGER_SERVICE_ACCOUNT)
	)
});

*/
