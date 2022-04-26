/* eslint-disable import/extensions */
import { createRequire } from "module";
import { log } from "./utils.js";

const require = createRequire(import.meta.url);
const installations = require("./data/installations.json");
const commands = require("./data/commands.json");
const deltas = require("./data/deltas.json");
const squadrons = require("./data/squadrons.json");

const debug = process.env.DEBUG;

const inserterUnits = async (prisma, kind, insertData, last) => {
	if (
		kind === "Command" ||
		kind === "Installation" ||
		kind === "Delta" ||
		kind === "Squadron"
	) {
		let data;
		switch (kind) {
			case "Command":
				data = {
					name: insertData.name,
					abbrev: insertData.abbrev,
					kind: "COMMAND",
					function: insertData.function,
					location: null,
					installationID: null,
					parentID: null,
					grandParentID: null
				};
				break;
			case "Installation":
				data = {
					name: insertData.name,
					abbrev: null,
					kind: "INSTALLATION",
					function: null,
					location: insertData.location,
					installationID: null,
					parentID: null,
					grandParentID: null
				};
				break;
			case "Delta":
				if (insertData.command === undefined) {
					console.log("Delta no data.command", { insertData });
				}
				if (insertData.command.id === undefined) {
					console.log("Delta no data.command.id", { insertData });
				}
				data = {
					name: insertData.name,
					abbrev: insertData.abbrev,
					kind: "DELTA",
					function: insertData.function,
					location: null,
					installationID: null,
					parentID: insertData.command.id,
					grandParentID: null
				};
				break;
			case "Squadron":
				data = {
					name: insertData.name,
					abbrev: insertData.abbrev,
					kind: "SQUADRON",
					function: insertData.function,
					location: insertData.installation.location,
					installationID: insertData.installation.id,
					parentID: insertData.delta.id,
					grandParentID: insertData.command.id
				};
				break;
			default:
				console.log(`Failed to detect unit kind`);
		}
		const check = await prisma.Unit.findFirst({
			where: data
		});
		if (check == null) {
			const entry = await prisma.Unit.create({
				data
			});
			if (debug) {
				console.log(`  ${kind}: {`);
				Object.entries(entry).forEach(([k, v], idx) => {
					console.log(
						`    ${k}: ${v}${
							Object.entries(entry).length - 1 < idx ? "," : ""
						}`
					);
				});
				console.log(`  }${last ? "" : ","}`);
			}
		}
	}
};

const addCommands = async prisma => {
	if (debug) {
		console.log("Commands: [");
	}
	const promises = commands.map((command, idx) =>
		inserterUnits(prisma, "Command", command, idx + 1 === commands.length)
	);
	await Promise.all(promises);
	if (debug) {
		console.log("]");
	}
};

const addInstallations = async prisma => {
	if (debug) {
		console.log("Installations: [");
	}
	const promises = installations.map((installation, idx) =>
		inserterUnits(
			prisma,
			"Installation",
			installation,
			idx + 1 === installations.length
		)
	);
	await Promise.all(promises);
	if (debug) {
		console.log("]");
	}
};

const addDeltas = async (prisma, dbCommands) => {
	if (debug) {
		console.log("Deltas: [");
	}
	const promises = deltas.map((delta, idx) => {
		const deltaCommand = dbCommands.find(
			command => command.name === delta.parent
		);

		if (deltaCommand !== undefined) {
			// eslint-disable-next-line no-param-reassign
			delta.command = deltaCommand;
		} else {
			log.issue("Deltas", `Unable to seed ${delta}`);
		}
		return inserterUnits(prisma, "Delta", delta, idx + 1 === deltas.length);
	});
	await Promise.all(promises);
	if (debug) {
		console.log("]");
	}
};

const addSquadrons = async (prisma, dbDeltas, dbCommands, dbInstallations) => {
	if (debug) {
		console.log("Squadrons: [");
	}
	const promises = squadrons.map((squadron, idx) => {
		const squadronDelta = dbDeltas.find(
			delta => delta.name === squadron.parent
		);
		const squadronCommand = dbCommands.find(
			command => command.id === squadronDelta.parentID
		);
		const squadronInstallation = dbInstallations.find(
			installation => installation.name === squadron.location
		);

		if (squadronDelta !== undefined) {
			// eslint-disable-next-line no-param-reassign
			squadron.delta = squadronDelta;
		} else {
			log.issue(
				"Squadrons",
				`Unable to seed ${squadron} with delta ${squadronDelta}`
			);
		}

		if (squadronCommand !== undefined) {
			// eslint-disable-next-line no-param-reassign
			squadron.command = squadronCommand;
		} else {
			log.issue(
				"Squadrons",
				`Unable to seed ${squadron} with command ${squadronCommand}`
			);
		}

		// eslint-disable-next-line no-param-reassign
		squadron.installation =
			squadronInstallation !== undefined
				? squadronInstallation
				: { id: null };

		return inserterUnits(
			prisma,
			"Squadron",
			squadron,
			idx + 1 === squadrons.length
		);
	});
	await Promise.all(promises);
	if (debug) {
		console.log("]");
	}
};

const mkUnits = async prisma => {
	let dbCommands = await prisma.Unit.findMany({
		where: { kind: "COMMAND" }
	});

	let dbInstallations = await prisma.Unit.findMany({
		where: { kind: "INSTALLATION" }
	});

	let dbDeltas = await prisma.Unit.findMany({
		where: { kind: "DELTA" }
	});

	let dbSquadrons = await prisma.Unit.findMany({
		where: { kind: "SQUADRON" }
	});

	if (
		dbCommands == null ||
		dbCommands.length < commands.length ||
		dbInstallations == null ||
		dbInstallations.length < installations.length ||
		dbDeltas == null ||
		dbDeltas.length < deltas.length ||
		dbSquadrons == null ||
		dbSquadrons.length < squadrons.length
	) {
		if (dbCommands == null || dbCommands.length < commands.length) {
			await addCommands(prisma);
			dbCommands = await prisma.Unit.findMany({
				where: { kind: "COMMAND" }
			});
		} else {
			log.issue("Commands", "Commands are already seeded");
		}

		if (
			dbInstallations == null ||
			dbInstallations.length < installations.length
		) {
			await addInstallations(prisma);
			dbInstallations = await prisma.Unit.findMany({
				where: { kind: "INSTALLATION" }
			});
		} else {
			log.issue("Installations", "Installations are already seeded");
		}

		if (dbDeltas == null || dbDeltas.length < deltas.length) {
			if (dbCommands.length === commands.length) {
				await addDeltas(prisma, dbCommands);
				dbDeltas = await prisma.Unit.findMany({
					where: { kind: "DELTA" }
				});
			} else {
				log.issue("Deltas", "Commands are not yet ready");
			}
		} else {
			log.issue("Deltas", "Deltas are already seeded");
		}

		if (dbSquadrons == null || dbSquadrons.length < squadrons.length) {
			if (dbCommands == null || dbCommands.length < commands.length) {
				log.issue("Squadrons", "Commands are not yet ready");
			} else if (dbDeltas == null || dbDeltas.length < deltas.length) {
				log.issue("Squadrons", "Deltas are not yet ready");
			} else if (
				dbInstallations == null ||
				dbInstallations.length < installations.length
			) {
				log.issue("Squadrons", "Installations are not yet ready");
			} else {
				await addSquadrons(
					prisma,
					dbDeltas,
					dbCommands,
					dbInstallations
				);
				dbSquadrons = await prisma.Unit.findMany({
					where: { kind: "SQUADRON" }
				});
			}
		} else {
			log.issue("Squadrons", "Squadrons are already seeded");
		}
	} else {
		console.log("All units are already seeded");
	}
};

const checkUnitStatus = async prisma => {
	const dbCommands = await prisma.Unit.findMany({
		where: { kind: "COMMAND" }
	});

	const dbInstallations = await prisma.Unit.findMany({
		where: { kind: "INSTALLATION" }
	});

	const dbDeltas = await prisma.Unit.findMany({
		where: { kind: "DELTA" }
	});

	const dbSquadrons = await prisma.Unit.findMany({
		where: { kind: "SQUADRON" }
	});

	console.log(`
| Units         | Current | Expected |
| ------------- | ------- | -------- |
| Commands      | ${dbCommands.length}       | ${commands.length}        |
| Installations | ${dbInstallations.length}      | ${installations.length}       |
| Deltas        | ${dbDeltas.length}      | ${deltas.length}       |
| Squadrons     | ${dbSquadrons.length}      | ${squadrons.length}       |
	`);
};

export { mkUnits, checkUnitStatus };
