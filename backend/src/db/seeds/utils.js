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

const isObject = obj =>
	typeof obj === "object" && !Array.isArray(obj) && obj !== null;

const cmpData = (arr1, arr2, ignoreKeys = []) => {
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
		return false;
	}
	if (arr1.length === arr2.length && arr1.length > 0 && arr2.length > 0) {
		if (isObject(arr1[0]) && isObject(arr2[0])) {
			return arr1
				.map((_, idx) => {
					const entry1 = Object.entries(arr1[idx])
						.filter(([k]) => !ignoreKeys.includes(k))
						.flat();

					const entry2 = Object.entries(arr2[idx])
						.filter(([k]) => !ignoreKeys.includes(k))
						.flat();
					return cmpData(entry1, entry2);
				})
				.every(v => v === true);
		}
		return arr1
			.map((_, idx) => arr1[idx] === arr2[idx])
			.every(v => v === true);
	}
	return false;
};

const genData = async (prisma, schemaName, datum, wheres, debug = false) => {
	const dbg = msg => {
		if (debug === true) {
			console.log(msg);
		}
	};
	let currentPrismaData = await prisma[schemaName].findMany();

	dbg(`${schemaName} Count: ${currentPrismaData.length}/${datum.length}`);

	if (
		!cmpData(currentPrismaData, datum, [
			"id",
			"createdAt",
			"completedAt",
			"updatedAt"
		])
	) {
		if (currentPrismaData.length > 0) {
			dbg(`Prisma attempting to delete all entries from ${schemaName}`);
			try {
				await prisma[schemaName].deleteMany({});
			} catch (err) {
				dbg(`Error while trying to delete entries: ${err}`);
				throw new Error(
					`Prisma  failed to delete entries from ${schemaName}: ${err}`
				);
			}
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

		dbg(`Prisma attempting to seed all entries for ${schemaName}`);
		if (debug) {
			const failures = [];
			let failureErrors = "N/a";
			// eslint-disable-next-line no-restricted-syntax
			for (const d of data) {
				try {
					// eslint-disable-next-line no-await-in-loop
					await prisma[schemaName].create({
						data: d
					});
				} catch (err) {
					const failureID = data.indexOf(d) + 1;
					failures.push(failureID);
					failureErrors = err.message;
				}
			}

			if (failures.length > 0) {
				dbg("Failed to insert: [");
				dbg(
					`${schemaName}: ${JSON.stringify(
						{ id: failures[0], ...data[failures[0] - 1] },
						null,
						2
					)}${failures.length > 1 ? "," : ""}`
				);
				if (failures.length > 1) {
					if (failures.length > 2) {
						const plural = failures.length > 3 ? "s" : "";
						const desc =
							schemaName === "TaskUsers"
								? `user${plural} with tasks`
								: `${schemaName.toLowerCase()}${plural}`;
						dbg(`\n... ${failures.length - 2} more ${desc} ...\n`);
					}
					dbg(
						`${schemaName}: ${JSON.stringify(
							{
								id: failures[0],
								...data[failures[failures.length - 1] - 1]
							},
							null,
							2
						)}`
					);
				}
				dbg("]");
				dbg(`Failures: ${failures.length}: ${failureErrors[0]}`);

				throw new Error(
					`Prisma had ${failures.length} failure${
						failures.length > 1 ? "s" : ""
					} trying to create entries for ${schemaName}!`
				);
			} else {
				dbg(`Prisma seed for ${schemaName} was sucessful`);
			}
		} else {
			try {
				await prisma[schemaName].createMany({
					data
				});
			} catch (err) {
				throw new Error(
					`Prisma failed to create entries for ${schemaName}: ${err}`
				);
			}
		}
	} else {
		dbg(`${schemaName} is already seeded`);
	}

	try {
		currentPrismaData = await prisma[schemaName].findMany();
	} catch (err) {
		throw new Error(`Prisma failed to find ${schemaName}: ${err}`);
	}

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
