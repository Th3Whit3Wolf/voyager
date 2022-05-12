import Prisma from "@prisma/client";
import notifier from "node-notifier";
import path from "path";
import * as url from "url";

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
const notificationIMG = path.join(
	url.fileURLToPath(new URL(".", import.meta.url)),
	"data/notification.png"
);

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
		notifier.notify({
			title: "Database Seeding Failed",
			message: `Database seeding error!`,
			sound: true, // Only Notification Center or Windows Toasters
			wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
			icon: notificationIMG,
			contentImage: notificationIMG,
			open: `file://${notificationIMG}`
		});
		process.exit(1);
	})
	.finally(async () => {
		console.log("Successfully seeded database. Closing connection.");
		notifier.notify({
			title: "Database Seeding Success",
			message: "Successful seeded units, roles, users, & tasks!",
			sound: true, // Only Notification Center or Windows Toasters
			wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
			icon: notificationIMG,
			contentImage: notificationIMG,
			open: `file://${notificationIMG}`
		});
		await prisma.$disconnect();
	});
