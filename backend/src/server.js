import express from "express";
// const db = require("./db");

const app = express();

app.use(express.json());

app.get("/status", (req, res) => {
	res.send("good");
});

export default app;
