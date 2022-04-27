import { Console } from "console";
import { Transform } from "stream";

const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "docker";
const PG_PORT = process.env.PG_PORT || 5432;
const PG_HOST = process.env.PG_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "voyager";

const URI =
	process.env.DATABASE_URL === undefined
		? `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${DB_NAME}?schema=public`
		: process.env.DATABASE_URL;

const log = {
	issue(name, desc, restart) {
		console.log(`[ISSUE]::${name} => ${desc}`);
	}
};

const statusUpdate = (schemaName, data) => {
	// @see https://stackoverflow.com/a/67859384
	const ts = new Transform({
		transform(chunk, enc, cb) {
			cb(null, chunk);
		}
	});
	const logger = new Console({ stdout: ts });
	logger.table(data);
	const table = (ts.read() || "").toString();
	let result = "";
	table.split(/[\r\n]+/).forEach(row => {
		let r = row.replace(/[^┬]*┬/, "├");
		r = r.replace(/┐/g, "┤");
		r = r.replace(/^├─*┼/, "├");
		r = r.replace(/│[^│]*/, "");
		r = r.replace(/^└─*┴/, "└");
		r = r.replace(/'/g, " ");
		result += `${r}\n`;
	});

	const title = `Table: ${schemaName}`;
	const resultLineLength = result.split("\n")[0].length;
	const leftIndent = Math.ceil((resultLineLength - title.length) / 2 - 1);
	const rightIndent = Math.floor((resultLineLength - title.length) / 2 - 1);
	console.log(
		`┌${"─".repeat(resultLineLength - 2)}┐\n│${" ".repeat(
			leftIndent
		)}${title}${" ".repeat(rightIndent)}│\n${result}`
	);
};

export { log, statusUpdate, URI };
