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

const statusUpdate = (schemaName, data) => {
	// @see https://stackoverflow.com/a/67859384
	const ts = new Transform({
		transform(chunk, enc, cb) {
			cb(null, chunk);
		}
	});

	const dataItemNames = data.map(iota => iota.Name);
	const sortedNames = dataItemNames.sort((a, b) => b.length - a.length);
	const maxNameLen = sortedNames[0].length;

	const dataFmt = data.map(row => {
		if (row.Name.length < maxNameLen) {
			const Name = `${row.Name}${" ".repeat(
				maxNameLen - row.Name.length
			)}`;
			return { ...row, Name };
		}
		return row;
	});

	const logger = new Console({ stdout: ts });
	logger.table(dataFmt);
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

// let wheres = [{ display: "", fieldName: "", fieldVal: val }];
const genData = async (prisma, schemaName, datum, wheres) => {
	let currentPrismaData = await prisma[schemaName].findMany();

	if (currentPrismaData.length !== datum.length) {
		if (currentPrismaData.length > 1) {
			await prisma[schemaName].deleteMany({});
		}
		const data = datum.map(d => {
			const deets = { ...d };
			if (deets.createdAt !== undefined) {
				deets.createdAt = new Date(deets.createdAt);
			}
			if (deets.completedAt !== undefined) {
				deets.completedAt = new Date(deets.completedAt);
			}
			return deets;
		});

		await prisma[schemaName].createMany({
			data
		});
	}

	currentPrismaData = await prisma[schemaName].findMany();
	const statusData = [];

	// eslint-disable-next-line no-restricted-syntax
	for (const where of wheres) {
		const curr = currentPrismaData.filter(
			item => item[where.fieldName] === where.fieldVal
		);
		const expected = datum.filter(
			item => item[where.fieldName] === where.fieldVal
		);
		statusData.push({
			Name: where.display,
			Current: curr.length,
			Expected: expected.length
		});
	}

	statusData.push({
		Name: "Total",
		Current: currentPrismaData.length,
		Expected: datum.length
	});

	statusUpdate(schemaName, statusData);
};

export { genData, URI };
