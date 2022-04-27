import Prisma from "@prisma/client";
import { URI } from "./utils";
import { mkUnits, checkUnitStatus } from "./units";
import { mkRoles, checkRoleStatus } from "./roles";

const { PrismaClient } = Prisma;

const main = async prisma => {
	await mkUnits(prisma);
	await mkRoles(prisma);
};

const checkStatus = async prisma => {
	await checkUnitStatus(prisma);
	await checkRoleStatus(prisma);
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
		await checkStatus(prisma);
		console.log("Successfully seeded database. Closing connection.");

		await prisma.$disconnect();
	});
