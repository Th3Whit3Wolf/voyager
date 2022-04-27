import { createRequire } from "module";
import { statusUpdate } from "./utils";
import { getUnit } from "./units";

const require = createRequire(import.meta.url);
const installations = require("./data/installations.json");
const commands = require("./data/commands.json");
const deltas = require("./data/deltas.json");
const squadrons = require("./data/squadrons.json");

const debug = process.env.DEBUG;

const checkRequirements = async prisma => {
	try {
		const dbCommands = await getUnit.Command(prisma);
		const dbInstallations = await getUnit.Installation(prisma);
		const dbDeltas = await getUnit.Delta(prisma);
		const dbSquadrons = await getUnit.Squadron(prisma);
		const status = {
			commands: () => {
				return dbCommands.length === commands.length;
			},
			installations: () => {
				return dbInstallations.length === installations.length;
			},
			deltas: () => {
				return dbDeltas.length === deltas.length;
			},
			squadrons: () => {
				return dbSquadrons.length === squadrons.length;
			},
			check: () => {
				return (
					status.commands &&
					status.installations &&
					status.deltas &&
					status.squadrons
				);
			}
		};

		if (status.check) {
			return true;
		}
		if (!status.commands) {
			console.error(
				`[ROLES]::checkRequirements(commands) => expected ${commands.length} commands, found ${dbCommands.length}`
			);
		} else if (!status.installations) {
			console.error(
				`[ROLES]::checkRequirements(installations) => expected ${installations.length} installations, found ${dbInstallations.length}`
			);
		} else if (!status.deltas) {
			console.error(
				`[ROLES]::checkRequirements(deltas) => expected ${deltas.length} deltas, found ${dbDeltas.length}`
			);
		} else if (!status.squadrons) {
			console.error(
				`[ROLES]::checkRequirements(squadrons) => expected ${squadrons.length} squadrons, found ${dbSquadrons.length}`
			);
		} else {
			console.error("This shouldn't have failed");
		}
		return false;
	} catch (_) {
		console.error(
			"[ROLES]::checkRequirements => unable to connect to database"
		);
		return false;
	}
};

const kinds = ["user", "site", "command", "installation", "delta", "squadron"];

const kindsObj = {
	user: {
		enum: "USER",
		display: "User Role",
		checkUnitID: false
	},
	site: {
		enum: "SITE_ADMIN",
		display: "Site Administrator Role",
		checkUnitID: false
	},
	command: {
		enum: "COMMAND_ADMIN",
		display: "Command Administrator Role",
		checkUnitID: true
	},
	installation: {
		enum: "INSTALLATION_ADMIN",
		display: "Installations Administrator Role",
		checkUnitID: true
	},
	delta: {
		enum: "DELTA_ADMIN",
		display: "Delta Administrator Role",
		checkUnitID: true
	},
	squadron: {
		enum: "SQUADRON_ADMIN",
		display: "Squadron Administrator Role",
		checkUnitID: true
	}
};

const insertRole = async (prisma, kind, unitID) => {
	if (!kinds.includes(kind)) {
		throw new Error(
			`[ROLES]::insertRole => Invalid kind. Expected one of ${kinds.join(
				", "
			)}, found ${kind}`
		);
	}

	if (
		kindsObj[kind].checkUnitID &&
		(unitID === undefined || unitID === null)
	) {
		throw new Error(
			"[ROLES]::insertRole => Kind must not be undefined or null"
		);
	}

	const data = kindsObj[kind].checkUnitID
		? { kind: kindsObj[kind].enum, unitID }
		: { kind: kindsObj[kind].enum };

	const check = await prisma.Role.findFirst({
		where: data
	});

	if (check == null) {
		const entry = await prisma.Role.create({
			data
		});
		if (debug) {
			console.log(`  ${kindsObj[kind].display}: {`);
			Object.entries(entry).forEach(([k, v], idx) => {
				console.log(
					`    ${k}: ${v}${
						Object.entries(entry).length - 1 < idx ? "," : ""
					}`
				);
			});
			console.log("  }");
		}
	}
};

const insertRoles = async (prisma, kind, dependency) => {
	try {
		const promises = dependency.map(dep => {
			return insertRole(prisma, kind, dep.id);
		});

		await Promise.all(promises);
		// console.log({ entries });
	} catch (err) {
		console.error(err);
	}
};

const mkRoles = async prisma => {
	if (checkRequirements(prisma)) {
		try {
			const dbCommands = await getUnit.Command(prisma);
			const dbInstallations = await getUnit.Installation(prisma);
			const dbDeltas = await getUnit.Delta(prisma);
			const dbSquadrons = await getUnit.Squadron(prisma);

			if (debug) {
				console.log("Role: [");
			}

			insertRole(prisma, "site");
			insertRole(prisma, "user");
			insertRoles(prisma, "command", dbCommands);
			insertRoles(prisma, "installation", dbInstallations);
			insertRoles(prisma, "delta", dbDeltas);
			insertRoles(prisma, "squadron", dbSquadrons);

			if (debug) {
				console.log("]");
			}
		} catch (_) {
			console.error("[ROLES]::mkRoles => unable to connect to database");
		}
	} else {
		console.error("[ROLES]::mkRoles => Requirements not met");
	}
};

const getRoles = {
	User: async prisma => {
		const q = await prisma.Role.findMany({
			where: { kind: "USER" }
		});
		return q;
	},
	Site: async prisma => {
		const q = await prisma.Role.findMany({
			where: { kind: "SITE_ADMIN" }
		});
		return q;
	},
	Command: async prisma => {
		const q = await prisma.Role.findMany({
			where: { kind: "COMMAND_ADMIN" }
		});
		return q;
	},
	Installation: async prisma => {
		const q = await prisma.Role.findMany({
			where: { kind: "INSTALLATION_ADMIN" }
		});
		return q;
	},
	Delta: async prisma => {
		const q = await prisma.Role.findMany({
			where: { kind: "DELTA_ADMIN" }
		});
		return q;
	},
	Squadron: async prisma => {
		const q = await prisma.Role.findMany({
			where: { kind: "SQUADRON_ADMIN" }
		});
		return q;
	}
};

const checkRoleStatus = async prisma => {
	const dbCommands = await getUnit.Command(prisma);
	const dbInstallations = await getUnit.Installation(prisma);
	const dbDeltas = await getUnit.Delta(prisma);
	const dbSquadrons = await getUnit.Squadron(prisma);
	const dbUsers = await getRoles.User(prisma);
	const dbSiteAdmins = await getRoles.Site(prisma);
	const dbCommandAdmins = await getRoles.Command(prisma);
	const dbInstallationAdmin = await getRoles.Installation(prisma);
	const dbDeltaAdmin = await getRoles.Delta(prisma);
	const dbSquadronAdmin = await getRoles.Squadron(prisma);

	statusUpdate("Role", [
		{ Name: "Users", Current: dbUsers.length, Expected: 1 },
		{
			Name: "Site Administrators",
			Current: dbSiteAdmins.length,
			Expected: 1
		},
		{
			Name: "Command Administrators",
			Current: dbCommandAdmins.length,
			Expected: dbCommands.length
		},
		{
			Name: "Installation Administrator",
			Current: dbInstallationAdmin.length,
			Expected: dbInstallations.length
		},
		{
			Name: "Delta Administrators",
			Current: dbDeltaAdmin.length,
			Expected: dbDeltas.length
		},
		{
			Name: "Squadron Administrators",
			Current: dbSquadronAdmin.length,
			Expected: dbSquadrons.length
		}
	]);
};

export { getRoles, mkRoles, checkRoleStatus };
