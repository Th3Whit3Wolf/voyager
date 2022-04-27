import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.header({
		"Access-Control-Allow-Headers":
			"Origin, X-Requested-With, Content-Type, Accept"
	});
	res.header({
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
	});
	next();
});

app.get("/status", (req, res) => {
	res.send("good");
});

/// Read all exported routes and use them
Object.keys(routes).forEach(route => {
	app.use("/api/v1/", routes[route]);
});

export default app;
