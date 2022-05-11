import { admin } from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { GOOGLE_APPLICATION_CREDENTIALS } = process.env;
const apiKey = process.env.API_KEY || "api-key";

// eslint-disable-next-line import/no-dynamic-require
const appCreds = require(GOOGLE_APPLICATION_CREDENTIALS);

const config = {
	apiKey,
	authDomain: "bsdi-capstone.firebaseapp.com",
	projectId: "bsdi-capstone"
};

const credentials = {
	credential: admin.credential.cert(appCreds)
};

const serviceAccount =
	GOOGLE_APPLICATION_CREDENTIALS !== undefined ? credentials : config;

admin.initializeApp(serviceAccount);

export default admin;
