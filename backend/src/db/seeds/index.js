import Prisma from "@prisma/client";

import { createRequire } from "module";

const { PrismaClient } = Prisma;

const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "docker";
const PG_PORT = process.env.PG_PORT || 5432;
const PG_HOST = process.env.PG_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "voyager";

const URI =
	process.env.DATABASE_URL === undefined
		? `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${DB_NAME}?schema=public`
		: process.env.DATABASE_URL;

const require = createRequire(import.meta.url);
const installations = require("./installations.json");
const commands = require("./commands.json");
const deltas = require("./deltas.json");
const squadrons = require("./squadrons.json");

/*
seedObj : {
	model: "",
	require: [
		{
			model: "",
			data: jsonObj,
			foreignKey: "",
			keyName: "",
			where: {
				operation: "",
				foreignKey: "",
				equalsKeyValue: ""
			}
		}
	],
	data: jsonObj,
	where: {},
	update: {},
	create: {}
}
*/

const installationsObj = {
	model: "Installation",
	req: [],
	data: installations,
	where: "name",
	update: {},
	create: {}
};

const commandsObj = {
	model: "Command",
	req: [],
	data: commands,
	where: "name",
	update: {},
	create: {}
};

const deltasObj = {
	model: "Delta",
	req: [
		{
			model: "Command",
			data: commands,
			foreignKey: "id",
			keyName: "commandId",
			where: {
				operation: "findFirst",
				foreignKey: "name",
				equalsKeyValue: "under"
			}
		}
	],
	data: deltas,
	where: "name",
	update: {},
	create: ["name", "abbrev", "function"]
};

const squadronsObj = {
	model: "Squadron",
	req: [
		{
			model: "Installation",
			data: installations,
			foreignKey: "id",
			keyName: "installationId",
			where: {
				operation: "findFirst",
				foreignKey: "name",
				equalsKeyValue: "location"
			}
		},
		{
			model: "Delta",
			data: deltas,
			foreignKey: "id",
			keyName: "deltaId",
			where: {
				operation: "findFirst",
				foreignKey: "name",
				equalsKeyValue: "under"
			}
		}
	],
	data: squadrons,
	where: "name",
	update: {},
	create: ["name", "abbrev", "function"]
};

const seedExecutor = async (
	prisma,
	model,
	req,
	data,
	create,
	where,
	update
) => {
	const promises = data.map(async iota => {
		const createData = Array.isArray(create)
			? create.reduce((ac, a) => ({ ...ac, [a]: iota[a] }), {})
			: { ...iota };
		if (iota[where] === undefined) {
			console.log(`${model}obj.data.${where} doesn't exist`);
		}
		if (req.length > 0) {
			// eslint-disable-next-line no-restricted-syntax
			for (const requirement of req) {
				if (
					requirement.model !== undefined &&
					requirement.data !== undefined &&
					requirement.foreignKey !== undefined &&
					requirement.where !== undefined
				) {
					try {
						// eslint-disable-next-line no-await-in-loop
						const reqTableRow = await prisma[requirement.model][
							requirement.where.operation
						]({
							where: {
								[requirement.where.foreignKey]:
									iota[requirement.where.equalsKeyValue]
							}
						});
						createData[requirement.keyName] =
							reqTableRow[requirement.foreignKey];
					} catch (err) {
						// console.log({ requirement });
						console.log(
							`[ISSUE]::${model} unable to find ${
								requirement.model
							} with ${requirement.where.foreignKey} = "${
								iota[requirement.where.equalsKeyValue]
							}"`
						);
					}
				} else {
					console.log(
						`[ISSUE]::${model} requirements incorrectly defined`
					);
				}
			}
		}
		console.log({ createData });
		const entry = await prisma[model].upsert({
			where: { [where]: iota[where] },
			update,
			create: createData
		});
		return entry;
	});

	const entries = await Promise.all(promises);
	if (entries.length > 0) {
		console.log(`${model}s: [`);

		entries.forEach((e, index) => {
			console.log(`  ${model}: {`);
			Object.entries(e).forEach(([k, v], idx) => {
				console.log(`    ${k}: ${v}`);
				if (Object.entries(e).length - 1 === idx) {
					console.log(
						`  }${entries.length - 1 === index ? "" : ","}`
					);
				}
			});
		});
		console.log(`]`);
	}
};

const seedGenerator = async (
	prisma,
	{ model, req, data, where, update, create }
) => {
	console.log(`[INIT]:${model}`);
	if (req.length > 0) {
		const issues = [];
		// eslint-disable-next-line no-restricted-syntax
		for (const requirement of req) {
			// eslint-disable-next-line no-await-in-loop
			const reqModelCount = await prisma[requirement.model].count();
			console.log(
				`[LOG]::${model} requires ${requirement.model} ${reqModelCount}/${requirement.data.length}`
			);
			if (reqModelCount < requirement.data.length) {
				issues.push(
					`[ISSUE]::${model} requires ${requirement.model}\n[STATUS]::${requirement.model}\n  Current Count: ${reqModelCount}\n  Expected: ${requirement.data.length}`
				);
			}
		}
		if (issues.length > 0) {
			issues.forEach(issue => console.log(issue));
			console.log("...task sleeping for 2 seconds");
			setTimeout(seedGenerator, 2000, prisma, {
				model,
				req,
				data,
				where,
				update,
				create
			});
		} else {
			seedExecutor(prisma, model, req, data, create, where, update);
		}
	} else {
		seedExecutor(prisma, model, req, data, create, where, update);
	}
};

async function main(prisma) {
	const schemas = [installationsObj, commandsObj, deltasObj, squadronsObj];

	schemas.forEach(async schema => {
		try {
			await seedGenerator(prisma, schema);
		} catch (err) {
			console.error(
				`There was an error while seeding ${schema.model}s: ${err}`
			);
		}
	});
}

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: URI
		}
	}
});

main(prisma)
	.catch(e => {
		console.error(`There was an error while seeding: ${e}`);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Successfully seeded database. Closing connection.");
		await prisma.$disconnect();
	});
