import express from "express";
import helmet from "helmet";
import actuator from "express-actuator";
import expressPino from "express-pino-logger";
import cors from "cors";
import routes from "./routes";
import logger from "./logger";

const NODE_ENV = process.env.NODE_ENV || "development";
const app = express();
const log = expressPino({
	logger
});

app.use(helmet());
app.use(
	actuator({
		infoGitMode: "simple", // the amount of git information you want to expose, 'simple' or 'full',
		infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
		infoDateFormat: "MMMM Do YYYY, h:mm:ss a", // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
		customEndpoints: [] // array of custom endpoints
	})
);
app.use(log);

if (NODE_ENV === "production") {
	app.use(
		cors({
			methods: ["GET", "PUT", "POST", "DELETE"]
		})
	);
} else {
	app.use((req, res, next) => {
		res.header({ "Access-Control-Allow-Origin": "http://localhost:3000" });
		res.header({
			"Access-Control-Allow-Headers":
				"Origin, X-Requested-With, Content-Type, Accept"
		});
		res.header({
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
		});
		next();
	});
}
app.use(express.json());

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
