import Prisma from "@prisma/client";

// eslint-disable-next-line import/extensions
import { URI } from "./utils.js";
import {
	seedRoles,
	seedTasks,
	seedTaskUsers,
	seedUnits,
	seedUsers
	// eslint-disable-next-line import/extensions
} from "./seeders/index.js";

const debug = process.env.DEBUG === "true" || false;
const { PrismaClient } = Prisma;

const main = async prisma => {
	const seeds = [
		{ name: "Units", data: seedUnits },
		{ name: "Roles", data: seedRoles },
		{ name: "Users", data: seedUsers },
		{ name: "Tasks", data: seedTasks },
		{ name: "TaskUsers", data: seedTaskUsers }
	];
	// eslint-disable-next-line no-restricted-syntax
	for (const seed of seeds) {
		try {
			// eslint-disable-next-line no-await-in-loop
			await seed.data(prisma, debug);
		} catch (err) {
			throw new Error(`Error occured while seeding ${seed.name}: ${err}`);
		}
	}
};

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: URI
		}
	}
});

main(prisma)
	.catch(err => {
		console.error(`There was an error while seeding: ${err}`);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Successfully seeded database. Closing connection.");
		await prisma.$disconnect();
	});
