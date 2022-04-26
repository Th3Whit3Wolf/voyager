const express = require("express");
const routes = require("./routes");
// const db = require("./db");

const app = express();

app.use(express.json());
app.get("/status", (req, res) => {
	return res.status(200).send("Green Status");
});

app.get("/api/v1/deltas", routes.delta);

require("./routes")(app);
