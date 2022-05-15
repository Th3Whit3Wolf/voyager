import admin from "../config/firebase";

/**
 * Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
 * The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
 * `Authorization: Bearer <Firebase ID Token>`.
 * when decoded successfully, the ID Token content will be added as `req.user`.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {status} 201 Created
 * @return {status} 403 Unauthorized
 */
const checkIfAuthenticated = async (req, res, next) => {
	req.log.info("Check if request is authorized with Firebase ID token");

	if (
		(!req.headers.authorization ||
			!req.headers.authorization.startsWith("Bearer ")) &&
		(!req.session.user || !req.session.user.idToken)
	) {
		req.log.error(
			"No Firebase ID token was passed as a Bearer token in the Authorization header.",
			"Make sure you authorize your request by providing the following HTTP header:",
			"Authorization: Bearer <Firebase ID Token>",
			'or by passing a "__session" cookie.'
		);
		return res.status(403).send({
			error: "You are not authorized to make this request"
		});
	}
	let idToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer ")
	) {
		req.log.info('Found "Authorization" header');
		// Read the ID Token from the Authorization header.
		[, idToken] = req.headers.authorization.split("Bearer ");
	} else if (req.session.user && req.session.user.idToken) {
		req.log.info('Found "session" cookie');
		// Read the ID Token from cookie.
		idToken = req.session.user.idToken;
	} else {
		// No cookie
		return res.status(403).send({
			error: "You are not authorized to make this request"
		});
	}

	try {
		const decodedIdToken = await admin.auth().verifyIdToken(idToken);
		req.log.info("ID Token correctly decoded", decodedIdToken);
		if (!req.session.user) {
			req.log.info("Adding ID Token to session", decodedIdToken);
			req.session.user = { idToken: decodedIdToken };
		}
		return next();
	} catch (error) {
		req.log.error("Error while verifying Firebase ID token:", error);
		return res.status(403).send({
			error: "You are not authorized to make this request"
		});
	}
};

export default checkIfAuthenticated;
