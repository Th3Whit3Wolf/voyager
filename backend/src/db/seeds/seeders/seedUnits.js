import { createRequire } from "module";
import { genData } from "../utils";

const require = createRequire(import.meta.url);
const units = require("../data/units.json");

const seedUnits = async (prisma, dbg = false) => {
	await genData(
		prisma,
		"Unit",
		units,
		[
			{ display: "Commands", fieldName: "kind", fieldVal: "COMMAND" },
			{ display: "Deltas", fieldName: "kind", fieldVal: "DELTA" },
			{
				display: "Installations",
				fieldName: "kind",
				fieldVal: "INSTALLATION"
			},
			{ display: "Squadrons", fieldName: "kind", fieldVal: "SQUADRON" }
		],
		dbg
	);
};

export default seedUnits;
