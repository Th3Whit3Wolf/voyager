import { createRequire } from "module";
// eslint-disable-next-line import/extensions
import { genData } from "../utils.js";

const require = createRequire(import.meta.url);
const roles = require("../data/roles.json");

const seedRoles = async (prisma, dbg = false) => {
	await genData(
		prisma,
		"Role",
		roles,
		[
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
		],
		dbg
	);
};

export default seedRoles;
