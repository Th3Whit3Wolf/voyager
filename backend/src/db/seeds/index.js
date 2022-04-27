/* eslint-disable import/extensions */
import Prisma from "@prisma/client";
import { URI } from "./utils";
import { mkUnits, checkUnitStatus } from "./units";

const { PrismaClient } = Prisma;

const main = async prisma => {
	await mkUnits(prisma);
};

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
		await checkUnitStatus(prisma);
		console.log("Successfully seeded database. Closing connection.");

		await prisma.$disconnect();
	});
