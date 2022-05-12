import { createRequire } from "module";
import { genData } from "../utils";

const require = createRequire(import.meta.url);
const users = require("../data/users.json");

const seedUsers = async (prisma, dbg = false) => {
	await genData(
		prisma,
		"User",
		users,
		[
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
		],
		dbg
	);
};

export default seedUsers;
