/* eslint-disable indent */
/* eslint-disable import/no-dynamic-require */
import admin from "firebase-admin";
import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);

const { FIREBASE_SERVICE_ACCOUNT, FIREBASE_PATH } = process.env;

const serviceAccount =
	FIREBASE_PATH !== undefined
		? require(path.join(
				"/secrets",

				FIREBASE_PATH.replaceAll('"', "")
		  ))
		: JSON.parse(FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

export default admin;
