import Prisma from "@prisma/client";
import notifier from "node-notifier";
import path from "path";
import * as url from "url";
import { URI, genUpdatedSeedData, genData } from "./utils";

const { PrismaClient } = Prisma;
const prismaIMG = path.join(
	url.fileURLToPath(new URL(".", import.meta.url)),
	"data/notification.png"
);

const { units, roles, users, tasks, taskUsers } = genUpdatedSeedData();
const seedUnits = async prisma => {
	await genData(prisma, "Unit", units, "name", [
		{ display: "Commands", fieldName: "kind", fieldVal: "COMMAND" },
		{ display: "Deltas", fieldName: "kind", fieldVal: "DELTA" },
		{
			display: "Installations",
			fieldName: "kind",
			fieldVal: "INSTALLATION"
		},
		{ display: "Squadrons", fieldName: "kind", fieldVal: "SQUADRON" }
	]);
};

const seedRoles = async prisma => {
	await genData(prisma, "Role", roles, "kind", [
		{
			display: "Site Administrators",
			fieldName: "kind",
			fieldVal: "SITE_ADMIN"
		},
		{
			display: "Command Administrators",
			fieldName: "kind",
			fieldVal: "COMMAND_ADMIN"
		},
		{
			display: "Delta Administrators",
			fieldName: "kind",
			fieldVal: "DELTA_ADMIN"
		},
		{
			display: "Installation Administrators",
			fieldName: "kind",
			fieldVal: "INSTALLATION_ADMIN"
		},
		{
			display: "Squadron Administrators",
			fieldName: "kind",
			fieldVal: "SQUADRON_ADMIN"
		},
		{
			display: "Task Approvers",
			fieldName: "kind",
			fieldVal: "TASK_APPROVER"
		},
		{
			display: "Regular Users",
			fieldName: "kind",
			fieldVal: "USER"
		}
	]);
};

const seedUsers = async prisma => {
	await genData(prisma, "User", users, "email", [
		{
			display: "Site Administrators",
			fieldName: "roleID",
			fieldVal: 1
		},
		{
			display: "Command Administrators",
			fieldName: "roleID",
			fieldVal: 2
		},
		{
			display: "Delta Administrators",
			fieldName: "roleID",
			fieldVal: 3
		},
		{
			display: "Installation Administrators",
			fieldName: "roleID",
			fieldVal: 4
		},
		{
			display: "Squadron Administrators",
			fieldName: "roleID",
			fieldVal: 5
		},
		{
			display: "Task Approvers",
			fieldName: "roleID",
			fieldVal: 6
		},
		{
			display: "Regular Users",
			fieldName: "roleID",
			fieldVal: 7
		}
	]);
};

const seedTasks = async prisma => {
	await genData(prisma, "Task", tasks, "approverID", [
		{
			display: "In Processing",
			fieldName: "kind",
			fieldVal: "IN_PROCESSING"
		},
		{
			display: "Out Processing",
			fieldName: "kind",
			fieldVal: "OUT_PROCESSING"
		}
	]);
};

const seedTaskUsers = async prisma => {
	await genData(prisma, "TaskUser", taskUsers, "id", []);
};

const main = async prisma => {
	const seeds = [seedUnits, seedRoles, seedUsers, seedTasks, seedTaskUsers];
	// eslint-disable-next-line no-restricted-syntax
	for (const seed of seeds) {
		try {
			// eslint-disable-next-line no-await-in-loop
			await seed(prisma);
		} catch (err) {
			console.error(err);
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
			icon: prismaIMG,
			contentImage: prismaIMG,
			open: `file://${prismaIMG}`
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
			icon: prismaIMG,
			contentImage: prismaIMG,
			open: `file://${prismaIMG}`
		});
		await prisma.$disconnect();
	});
