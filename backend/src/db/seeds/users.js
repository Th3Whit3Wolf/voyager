import { createRequire } from "module";
import {
	statusUpdate,
	isSchemaSeeded,
	randomDSN,
	randomName,
	randomOfficeSymbol
} from "./utils";
import { getUnit } from "./units";
import { getRole } from "./roles";

const require = createRequire(import.meta.url);
const installations = require("./data/installations.json");
const commands = require("./data/commands.json");
const deltas = require("./data/deltas.json");
const squadrons = require("./data/squadrons.json");

const debug = process.env.DEBUG;

const checkRequirements = async prisma => {
	try {
		const unitSeededStatus = await isSchemaSeeded(prisma, "Unit");
		const roleSeededStatus = await isSchemaSeeded(prisma, "Role");
		return unitSeededStatus && roleSeededStatus;
	} catch (err) {
		console.error(`[USERS]::checkRequirements => ${err}`);
		return false;
	}
};

const ProcessingStatusEnum = [
	"IN_PROCESSING",
	"IN_TRANSIT",
	"OUT_PROCESSING",
	"OUT_PROCESSING_WITH_ORDERS",
	"STATIONARY"
];

const getUserByHeirarchy = async (prisma, unit) => {
	const hierarchy = ["SQUADRON", "INSTALLATION", "DELTA", "COMMAND"];

	let hierIdx = hierarchy.indexOf(unit.kind);
	let foundUser = false;
	let user = null;

	while (hierIdx < hierarchy.length && !foundUser) {
		let userQuery;
		if (hierarchy[hierIdx] === unit.kind) {
			// eslint-disable-next-line no-await-in-loop
			userQuery = await prisma.User.findFirst({
				where: {
					assignedUnit: unit
				}
			});
		} else if (
			unit.InstallationID !== null &&
			unit.InstallationID !== undefined &&
			hierIdx < 2
		) {
			// eslint-disable-next-line no-await-in-loop
			userQuery = await prisma.User.findFirst({
				where: {
					assignedUnit: unit.Installation
				}
			});
		} else if (unit.parentID !== null && unit.parentID !== undefined) {
			// eslint-disable-next-line no-await-in-loop
			userQuery = await prisma.User.findFirst({
				where: {
					assignedUnit: unit.parent
				}
			});
		} else if (
			unit.grandParentID !== null &&
			unit.grandParentID !== undefined
		) {
			// eslint-disable-next-line no-await-in-loop
			userQuery = await prisma.User.findFirst({
				where: {
					assignedUnit: unit.grandParent
				}
			});
		} else {
			hierIdx = hierarchy.length;
		}

		if (userQuery !== null && userQuery !== undefined) {
			user = userQuery;
			foundUser = true;
		}
	}

	return user;
};

const insertUser = async (prisma, role) => {
	const dsn = randomDSN();
	const [firstName, lastName] = randomName();
	const officeSymbol = randomOfficeSymbol();

	const status = "STATIONARY";

	let email = `${firstName}.${lastName}@spaceforce.mil`;
	let emailNum = 0;
	let emailStatus = false;

	const assignedUnitID = role.unitID;

	const roleID = role.id;
	while (!emailStatus) {
		// eslint-disable-next-line no-await-in-loop
		const checkEmail = await prisma.User.findFirst({
			where: { email }
		});
		if (checkEmail != null) {
			emailNum += 1;
			email = `${firstName}.${lastName}.${emailNum}@spaceforce.mil`;
		} else {
			emailStatus = true;
		}
	}

	const data = {
		firstName,
		lastName,
		dsn,
		status,
		auth: "",
		assignedUnitID,
		email,
		roleID,
		officeSymbol
	};

	const check = await prisma.User.findFirst({
		where: data
	});

	if (check == null) {
		const entry = await prisma.User.create({
			data
		});
		if (debug) {
			console.log(`  User: ${role.kind}: {`);
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

const insertRandomUser = async (prisma, role, assignedUnit, allUnits, kind) => {
	const dsn = randomDSN();
	const [firstName, lastName] = randomName();
	const officeSymbol = randomOfficeSymbol();

	const status =
		ProcessingStatusEnum[
			Math.floor(Math.random() * ProcessingStatusEnum.length)
		];

	let email = `${firstName}.${lastName}@spaceforce.mil`;
	let emailNum = 0;
	let emailStatus = false;

	if (assignedUnit === undefined) {
		console.error("Assigned unit is undefined: ", { role });
	}

	const supervisor = await getUserByHeirarchy(prisma, assignedUnit);

	let gainingUnit = allUnits[Math.floor(Math.random() * allUnits.length)];

	if (
		["IN_TRANSIT", "OUT_PROCESSING", "OUT_PROCESSING_WITH_ORDERS"].includes(
			status
		)
	) {
		while (gainingUnit === assignedUnit) {
			gainingUnit = allUnits[Math.floor(Math.random() * allUnits.length)];
		}
	}

	while (!emailStatus) {
		// eslint-disable-next-line no-await-in-loop
		const checkEmail = await prisma.User.findFirst({
			where: { email }
		});
		if (checkEmail != null) {
			emailNum += 1;
			email = `${firstName}.${lastName}.${emailNum}@spaceforce.mil`;
		} else {
			emailStatus = true;
		}
	}

	const data = {
		firstName,
		lastName,
		dsn,
		auth: "",
		status,
		assignedUnitID: assignedUnit.id,
		supervisorID: supervisor.id,
		email,
		roleID: role.id,
		officeSymbol,
		gainingUnitID: gainingUnit.id
	};

	const check = await prisma.User.findFirst({
		where: data
	});

	if (check == null) {
		const entry = await prisma.User.create({
			data
		});
		console.log({ entry });
		if (debug) {
			console.log(`  User: ${role.kind}: {`);
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

const mkUsers = async prisma => {
	const requirementsMet = await checkRequirements(prisma);
	if (requirementsMet) {
		const dbCommands = await getUnit.Command(prisma);
		const dbInstallations = await getUnit.Installation(prisma);
		const dbDeltas = await getUnit.Delta(prisma);
		const dbSquadrons = await getUnit.Squadron(prisma);
		const dbUsers = await getRole.User(prisma);
		const dbSiteAdmins = await getRole.Site(prisma);
		const dbCommandAdmins = await getRole.Command(prisma);
		const dbInstallationAdmin = await getRole.Installation(prisma);
		const dbDeltaAdmin = await getRole.Delta(prisma);
		const dbSquadronAdmin = await getRole.Squadron(prisma);
		const allUnits = await prisma.Unit.findMany();

		const starCommand = allUnits.find(
			unit => unit.name === "Space Operations Command"
		);

		const data = {
			firstName: "Rick",
			lastName: "Sanchez",
			email: "rick.sanchez@spaceforce.mil",
			dsn: "(312)867-5309",
			auth: "",
			officeSymbol: "MSOS",
			status: "STATIONARY",
			roleID: dbSiteAdmins[0].id,
			assignedUnitID: starCommand.id,
			gainingUnitID: null,
			supervisorID: null
		};

		const check = await prisma.User.findFirst({
			where: data
		});
		if (check == null) {
			await prisma.User.create({
				data
			});
		}

		try {
			const commandPromises = dbCommandAdmins.map(async admin => {
				const currentCommandUsers = await prisma.User.findMany({
					where: { assignedUnitID: admin.unitID }
				});
				if (currentCommandUsers.length < 6) {
					const command = dbCommands.find(
						com => com.id === admin.unitID
					);
					const commandAdmin = insertUser(prisma, admin);
					const randomCommandUsers = [...Array(5)].map(x => {
						return insertRandomUser(
							prisma,
							dbUsers[0],
							command,
							allUnits
						);
					});
					randomCommandUsers.push(commandAdmin);
					return randomCommandUsers;
				}
				return [];
			});
			await Promise.all(commandPromises);
		} catch (err) {
			console.error("Error seeding users with role COMMAND_ADMIN", err);
		}

		try {
			const deltaPromises = dbDeltaAdmin.map(async admin => {
				const currentDeltaUsers = await prisma.User.findMany({
					where: { assignedUnitID: admin.unitID }
				});
				if (currentDeltaUsers.length < 6) {
					const delta = dbDeltas.find(del => del.id === admin.unitID);
					const deltaAdmin = insertUser(prisma, admin);
					const randomDeltaUsers = [...Array(5)].map(x => {
						return insertRandomUser(
							prisma,
							dbUsers[0],
							delta,
							allUnits
						);
					});
					randomDeltaUsers.push(deltaAdmin);
					return randomDeltaUsers;
				}
				return [];
			});
			await Promise.all(deltaPromises);
		} catch (err) {
			console.error("Error seeding users with role DELTA_ADMIN:", err);
		}

		try {
			const installationPromises = dbInstallationAdmin.map(
				async admin => {
					const currentInstallationUsers = await prisma.User.findMany(
						{
							where: { assignedUnitID: admin.unitID }
						}
					);
					if (currentInstallationUsers.length < 6) {
						const base = dbInstallations.find(
							sfb => sfb.id === admin.unitID
						);
						const baseAdmin = insertUser(prisma, admin);
						const randomBaseUsers = [...Array(5)].map(x => {
							return insertRandomUser(
								prisma,
								dbUsers[0],
								base,
								allUnits
							);
						});
						randomBaseUsers.push(baseAdmin);
						return randomBaseUsers;
					}
					return [];
				}
			);
			await Promise.all(installationPromises);
		} catch (err) {
			console.error(
				"Error seeding users with role INSTALLATION_ADMIN: ",
				err
			);
		}

		try {
			const squadronPromises = dbSquadronAdmin.map(async admin => {
				const currentSquadronUsers = await prisma.User.findMany({
					where: { assignedUnitID: admin.unitID }
				});
				if (currentSquadronUsers.length < 6) {
					const squadron = dbSquadrons.find(
						sq => sq.id === admin.unitID
					);
					const squadronAdmin = insertUser(prisma, admin);
					const randomSquadronUsers = [...Array(5)].map(x => {
						return insertRandomUser(
							prisma,
							dbUsers[0],
							squadron,
							allUnits
						);
					});
					randomSquadronUsers.push(squadronAdmin);
					return randomSquadronUsers;
				}
				return [];
			});
			await Promise.all(squadronPromises);
		} catch (err) {
			console.error(
				"Error seeding users with role SQUADRON_ADMIN: ",
				err
			);
		}
	}
};

const checkUserStatus = async prisma => {
	const users = await prisma.User.findMany();
	const dbUsers = await getRole.User(prisma);

	const dbSiteAdmins = await getRole.Site(prisma);
	const dbSiteAdminsRoleIDs = dbSiteAdmins.map(admin => admin.id);
	const siteAdminCount = users.filter(usr =>
		dbSiteAdminsRoleIDs.includes(usr.roleID)
	).length;

	const dbCommandAdmins = await getRole.Command(prisma);
	const dbCommandAdminsRoleIDs = dbCommandAdmins.map(admin => admin.id);
	const commandAdminsCount = users.filter(usr =>
		dbCommandAdminsRoleIDs.includes(usr.roleID)
	).length;

	const dbDeltaAdmin = await getRole.Delta(prisma);
	const dbDeltaAdminsRoleIDs = dbDeltaAdmin.map(admin => admin.id);
	const deltaAdminsCount = users.filter(usr =>
		dbDeltaAdminsRoleIDs.includes(usr.roleID)
	).length;

	const dbInstallationAdmin = await getRole.Installation(prisma);
	const dbInstallationAdminsRoleIDs = dbInstallationAdmin.map(
		admin => admin.id
	);
	const installationAdminsCount = users.filter(usr =>
		dbInstallationAdminsRoleIDs.includes(usr.roleID)
	).length;

	const dbSquadronAdmin = await getRole.Squadron(prisma);
	const dbSquadronAdminsRoleIDs = dbSquadronAdmin.map(admin => admin.id);
	const squadronAdminsCount = users.filter(usr =>
		dbSquadronAdminsRoleIDs.includes(usr.roleID)
	).length;
	const regularUsers = users.filter(
		usr => usr.roleID === dbUsers[0].id
	).length;
	statusUpdate("User", [
		{
			Name: "Site Administrators",
			Current: siteAdminCount,
			Expected: 1
		},
		{
			Name: "Command Administrators",
			Current: commandAdminsCount,
			Expected: commands.length
		},
		{
			Name: "Delta Administrators",
			Current: deltaAdminsCount,
			Expected: deltas.length
		},
		{
			Name: "Installation Administrators",
			Current: installationAdminsCount,
			Expected: installations.length
		},
		{
			Name: "Squadron Administrators",
			Current: squadronAdminsCount,
			Expected: squadrons.length
		},
		{
			Name: "Regular Users",
			Current: regularUsers,
			Expected:
				(commands.length +
					deltas.length +
					installations.length +
					squadrons.length) *
				5
		}
	]);
};

export { mkUsers, checkUserStatus };
