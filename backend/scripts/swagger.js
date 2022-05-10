import swaggerJsdoc from "swagger-jsdoc";
import * as url from "url";
import { writeFileSync } from "fs";
import { join, resolve } from "path";

const baseDir = resolve(
	url.fileURLToPath(new URL(".", import.meta.url)),
	"../.."
);

const swaggerDefinition = {
	info: {
		// API informations (required)
		title: "Voyager",
		version: "0.1.0",
		description: "A better way to manage the bureaucracy of PCS'ing "
	},
	host: "bsdi1-voyager-backend.herokuapp.com",
	basePath: "/api/v1",
	schemes: ["https", "http"]
};
// Options for the swagger docs
const options = {
	// Import swaggerDefinitions
	swaggerDefinition,
	// Path to the API docs
	// Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
	apis: ["./src/routes/*.js"]
};
const swaggerSpec = swaggerJsdoc(options);

const filePath = join(baseDir, "docs", "swagger.json");
// console.log("paths", swaggerSpec);

writeFileSync(filePath, JSON.stringify(swaggerSpec, null, 2));
