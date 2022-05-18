import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { FIREBASE_VOYAGER_SERVICE_ACCOUNT } = process.env;

let cert;

try {
	cert = require("/app/src/config/accountService.json");
} catch {
	cert = JSON.parse(FIREBASE_VOYAGER_SERVICE_ACCOUNT);
}

admin.initializeApp({
	credential: admin.credential.cert(cert)
});

export default admin;
