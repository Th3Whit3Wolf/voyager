import express from "express";
import helmet from "helmet";
import actuator from "express-actuator";
import expressPino from "express-pino-logger";
import routes from "./routes";
import logger from "./logger";

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
app.use(express.json());

app.use((req, res, next) => {
	res.header({ "Access-Control-Allow-Origin": "http://localhost:3000" });
	res.header({
		"Access-Control-Allow-Headers":
			"Origin, X-Requested-With, Content-Type, Accept"
	});
	res.header({
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
	});
	next();
});

/*
## Endpoints provided by Express Actuator

| ID      | Description                                            |
| ------- | ------------------------------------------------------ |
| info    | Displays application information.                      |
| metrics | Shows metrics information for the current application. |
| health  | Shows application health information.                  |
*/

app.get("/", (req, res) => {
	res.send("ok");
});

/// Read all exported routes and use them
Object.keys(routes).forEach(route => {
	app.use("/api/v1/", routes[route]);
});

export default app;
