import Prisma from "@prisma/client";
import notifier from "node-notifier";
import path from "path";
import * as url from "url";
import { createRequire } from "module";

import { URI, genData } from "./utils";

const require = createRequire(import.meta.url);
const units = require("./data/units.json");
const roles = require("./data/roles.json");
const users = require("./data/users.json");
const tasks = require("./data/tasks.json");
const taskUsers = require("./data/task_users.json");

const { PrismaClient } = Prisma;
const prismaIMG = path.join(
	url.fileURLToPath(new URL(".", import.meta.url)),
	"data/notification.png"
);

const seedUnits = async prisma => {
	await genData(prisma, "Unit", units, [
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
	await genData(prisma, "Role", roles, [
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
	await genData(prisma, "User", users, [
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
	await genData(prisma, "Task", tasks, [
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
	const newTaskUsers = [
		{
			taskID: 404,
			userID: 8,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 405,
			userID: 8,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 406,
			userID: 8,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 407,
			userID: 8,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 408,
			userID: 8,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 409,
			userID: 8,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 404,
			userID: 9,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 405,
			userID: 9,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 406,
			userID: 9,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 407,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 408,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 409,
			userID: 9,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1090,
			userID: 9,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1091,
			userID: 9,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1092,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1093,
			userID: 9,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1094,
			userID: 9,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1095,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1096,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1097,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1098,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1099,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1100,
			userID: 9,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1101,
			userID: 9,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1102,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 1103,
			userID: 9,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 390,
			userID: 10,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 391,
			userID: 10,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 392,
			userID: 10,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 393,
			userID: 10,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 394,
			userID: 10,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 395,
			userID: 10,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 396,
			userID: 10,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 397,
			userID: 10,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 398,
			userID: 10,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 399,
			userID: 10,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 400,
			userID: 10,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 401,
			userID: 10,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 402,
			userID: 10,
			progress: "COMPLETED",
			completedAt: new Date("May 4, 2022 07:30:00"),
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 403,
			userID: 10,
			progress: "NOT_STARTED",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 404,
			userID: 11,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 405,
			userID: 11,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 406,
			userID: 11,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 407,
			userID: 11,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{
			taskID: 408,
			userID: 11,
			progress: "IN_PROGRESS",
			completedAt: null,
			createdAt: new Date("2022-01-07T00:00:00.001Z")
		},
		{ taskID: 409, userID: 11, progress: "IN_PROGRESS", completedAt: null }
	];
	const tasksUser = newTaskUsers.concat(taskUsers);
	await genData(prisma, "TaskUser", tasksUser, []);
};

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
			await seed.data(prisma);
		} catch (err) {
			console.error(`Error occured while seeding ${seed.name}: ${err}`);
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
