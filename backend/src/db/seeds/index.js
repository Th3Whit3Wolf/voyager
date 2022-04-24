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

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: URI
		}
	}
});

const createInstallations = async () => {
	installations.forEach(async installation => {
		const entry = await prisma.Installation.upsert({
			where: { location: installation.location },
			update: {},
			create: {
				...installation
			}
		});

		console.log(entry);
	});
};

async function main() {
	await createInstallations();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
