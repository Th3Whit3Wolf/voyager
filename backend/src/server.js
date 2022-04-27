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

app.use("/api/v1/", routes.squadrons);

export default app;
