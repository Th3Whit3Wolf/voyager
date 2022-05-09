import { Console } from "console";
import { createRequire } from "module";
import { Transform } from "stream";

const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "docker";
const PG_PORT = process.env.PG_PORT || 5432;
const PG_HOST = process.env.PG_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "voyager";
const today = new Date(5, 13);
const lastMonth = new Date(4, 13);
const threeMonthsAgo = new Date(2, 13);
const require = createRequire(import.meta.url);
const units = require("./data/units.json");
const roles = require("./data/roles.json");
const users = require("./data/users.json");
const tasks = require("./data/tasks.json");
const taskApprovers = require("./data/task_approvers.json");
const taskUsers = require("./data/task_users.json");

const URI =
	process.env.DATABASE_URL === undefined
		? `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${DB_NAME}?schema=public`
		: process.env.DATABASE_URL;

const randomValueBetween = (min, max) => Math.random() * (max - min) + min;

const randomDate = (date1, date2) => {
	let dateOne = date1 || "01-01-1970";
	let dateTwo = date2 || new Date().toLocaleDateString();
	dateOne = new Date(date1).getTime();
	dateTwo = new Date(date2).getTime();
	const newDate =
		dateOne > dateTwo
			? randomValueBetween(dateTwo, dateOne)
			: randomValueBetween(dateOne, dateTwo);
	return new Date(newDate);
};

const largestDate = (arr, key) =>
	new Date(Math.max(...arr.map(a => a[key]), 0));

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

/// Create new tasks and users Data with dates

/*
createdAt
updatedAt
*/

/// Create new tasks and users Data with dates
const genUpdatedSeedData = () => {
	const tasksCompleted = [];
	const tasksTouched = [];
	const allUsers = users.concat(taskApprovers);
	const newTaskUsers = taskUsers.map(task => {
		const randNum = randomValueBetween(0, 3);
		const newTaskUser = { ...task };
		const taskIdx = task.taskID - 1;
		const currTask = tasks[taskIdx];
		let completionDate;
		switch (randNum) {
			case 1:
				newTaskUser.progress = "IN_PROGRESS";
				tasksTouched.push({
					index: taskIdx,
					touchedAt: (newTaskUser.completedAt = `${
						currTask.kind === "IN_PROCESSING"
							? randomDate(lastMonth, today)
							: randomDate(threeMonthsAgo, today)
					}`)
				});
				return newTaskUser;
			case 2:
				completionDate =
					currTask.kind === "IN_PROCESSING"
						? randomDate(lastMonth, today)
						: randomDate(threeMonthsAgo, today);
				newTaskUser.progress = "COMPLETED";
				newTaskUser.completedAt = `${completionDate}`;
				tasksTouched.push({
					index: taskIdx,
					touchedAt: completionDate
				});
				tasksCompleted.push({
					index: taskIdx,
					completedAt: completionDate
				});
				return newTaskUser;
			default:
				return newTaskUser;
		}
	});

	const newTasks = tasks.map((task, taskIdx) => {
		const newTask = { ...task };
		let updatedAt;
		tasksTouched.forEach(t => {
			if (t.index === taskIdx) {
				updatedAt = t.touchedAt;
			}
		});

		newTask.createdAt = randomDate("12/20/2019", "01/01/2022");
		if (updatedAt !== undefined) {
			newTask.updatedAt = updatedAt;
		} else {
			newTask.updatedAt =
				newTask.kind === "IN_PROCESSING"
					? randomDate(newTask.createdAt, today)
					: randomDate(threeMonthsAgo, today);
		}

		return newTask;
	});

	const newUsers = allUsers.map((user, userIdx) => {
		const newUser = { ...user };
		const currUserID = userIdx + 1;
		newUser.createdAt =
			newUser.roleID === 1
				? new Date("20 Dec 2019 00:00:00 GMT")
				: randomDate("12/20/2019", "01/01/2022");
		if (newUser.roleID === 7) {
			const userTasks = newTaskUsers.filter(
				t => t.userID === currUserID && t.completedAt !== null
			);
			if (userTasks.length > 0) {
				const mostRecent = largestDate(userTasks, "completedAt");
				newUser.updatedAt = mostRecent;
			} else {
				newUser.updatedAt = newUser.createdAt;
			}
		} else if (newUser.roleID > 1) {
			const taskAssignOrApproved = newTasks.filter(
				t =>
					t[newUser.roleID !== 6 ? "assignerID" : "approverID"] ===
						currUserID && t.updatedAt !== null
			);
			if (taskAssignOrApproved.length > 0) {
				const mostRecent = largestDate(
					taskAssignOrApproved,
					"updatedAt"
				);
				newUser.updatedAt = mostRecent;
			} else {
				newUser.updatedAt = newUser.createdAt;
			}
		} else {
			newUser.updatedAt = new Date("20 Dec 2019 00:00:00 GMT");
		}
		return newUser;
	});

	const newRoles = roles.map((role, roleIdx) => {
		const newRole = { ...role };
		const currRoleID = roleIdx + 1;
		let updatedAt;
		newRole.createdAt = new Date("20 Dec 2019 00:00:00 GMT");
		const usersWithRole = newUsers.filter(
			usr => usr.roleID === currRoleID && usr.updatedAt !== null
		);

		if (usersWithRole.length > 0) {
			const mostRecent = largestDate(usersWithRole, "updatedAt");
			newRole.updatedAt = mostRecent;
		} else {
			newRole.updatedAt = updatedAt;
		}

		return newRole;
	});

	const newUnits = units.map(unit => {
		const newUnit = { ...unit };
		newUnit.createdAt = new Date("20 Dec 2019 00:00:00 GMT");
		newUnit.updatedAt = new Date("20 Dec 2019 00:00:00 GMT");
		return newUnit;
	});

	return {
		units: newUnits,
		roles: newRoles,
		users: newUsers,
		tasks: newTasks,
		taskUsers: newTaskUsers
	};
};

// let wheres = [{ display: "", fieldName: "", fieldVal: val }];
const genData = async (prisma, schemaName, datum, compare, wheres) => {
	let currentPrismaData = await prisma[schemaName].findMany();

	if (currentPrismaData.length !== datum.length) {
		if (currentPrismaData.length > 1) {
			await prisma[schemaName].deleteMany({});
		}
		// eslint-disable-next-line no-restricted-syntax
		for (const data of datum) {
			const findCurr = currentPrismaData.filter(
				cur => cur[compare] === data[compare]
			);
			if (findCurr.length < 1) {
				try {
					// eslint-disable-next-line no-await-in-loop
					await prisma[schemaName].create({
						data
					});
				} catch (err) {
					console.error(
						`Error occured while adding ${data[compare]} to ${schemaName}: ${err}`
					);
					console.error(
						`Context::${schemaName}(${
							data[compare]
						}): ${JSON.stringify(data)}`
					);
				}
			}
		}
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

export { genData, genUpdatedSeedData, randomDate, URI };
