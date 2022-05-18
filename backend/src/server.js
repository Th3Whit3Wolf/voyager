import express from "express";
import cookieParser from "cookie-parser";

import session from "express-session";
import helmet from "helmet";
import actuator from "express-actuator";
import expressPino from "express-pino-logger";
import cors from "cors";
import routes from "#routes";
import { logger } from "#config";

const secret = process.env.SESSION_SECRET || "weak sauce secret";
const NODE_ENV = process.env.NODE_ENV || "development";
const app = express();
const log = expressPino({
	logger
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(cookieParser());
app.use(
	actuator({
		infoGitMode: "simple", // the amount of git information you want to expose, 'simple' or 'full',
		infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
		infoDateFormat: "MMMM Do YYYY, h:mm:ss a", // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
		customEndpoints: [] // array of custom endpoints
	})
);
app.use(
	session({
		secret,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 /* one day */,
			secure: NODE_ENV === "production"
		},
		proxy : true,
		resave: false
	})
);
app.use(log);

if (NODE_ENV === "production") {
	app.use(
		cors({
			origin: "same-site",
			allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
			methods: ["GET", "PUT", "POST", "DELETE"]
		})
	);
} else {
	app.use((req, res, next) => {
		res.header({ "Access-Control-Allow-Origin": NODE_ENV === "production" ? "https://bsdi1-voyager-frontend.herokuapp.com" : "http://localhost:3000" });
		res.header({
			"Access-Control-Allow-Headers":
				"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		});
		res.header({
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
		});
		res.header({
			"Cross-Origin-Resource-Policy": "same-site"
		});
		next();
	});
}
app.use(express.json());
app.use(express.static("src/static"));

/*
## Endpoints provided by Express Actuator

| ID      | Description                                            |
| ------- | ------------------------------------------------------ |
| info    | Displays application information.                      |
| metrics | Shows metrics information for the current application. |
| health  | Shows application health information.                  |
*/

/// This route shouldn't be used
app.get("/", (req, res) => {
	res.send(
		'Did you mean to go to "https://bsdi1-voyager-frontend.herokuapp.com/"'
	);
});

/// Read all exported routes and use them
Object.keys(routes).forEach(route => {
	app.use("/api/v1/", routes[route]);
});

export default app;
