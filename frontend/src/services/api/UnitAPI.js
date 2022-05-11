import { APIQueryBuilder } from "./APIQueryBuilder";
const apiError = (fnName, expected, received) => {
	throw `\n[UnitAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`;
};
const endpoint = "units";
const validQueryParameters = {
	name: { type: "string" },
	abbrev: { type: "string" },
	kind: {
		type: "enum",
		variants: ["INSTALLATION", "COMMAND", "DELTA", "SQUADRON"]
	},
	function: { type: "string" },
	location: { type: "string" },
	createdAt: {
		type: "Date"
	},
	updatedAt: {
		type: "Date"
	},
	parentID: { type: "number" },
	grandParentID: { type: "number" },
	installationID: { type: "number" }
};

class UnitAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	name = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "name", value });
			return this;
		} else {
			return apiError("name", "string", value);
		}
	};

	abbrev = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "abbrev", value });
			return this;
		} else {
			return apiError("abbrev", "string", value);
		}
	};

	kind = value => {
		if (["INSTALLATION", "COMMAND", "DELTA", "SQUADRON"].includes(value)) {
			this.addQueryParameter({ name: "kind", value });
			return this;
		} else {
			return apiError(
				"kind",
				`One of ${["INSTALLATION", "COMMAND", "DELTA", "SQUADRON"].join(", ")}`,
				value
			);
		}
	};

	function = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "function", value });
			return this;
		} else {
			return apiError("function", "string", value);
		}
	};

	location = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "location", value });
			return this;
		} else {
			return apiError("location", "string", value);
		}
	};

	createdAt = value => {
		if (value instanceof Date && !isNaN(value)) {
			this.addQueryParameter({ name: "createdAt", value });
			return this;
		} else {
			return apiError("createdAt", "string", value);
		}
	};

	updatedAt = value => {
		if (value instanceof Date && !isNaN(value)) {
			this.addQueryParameter({ name: "updatedAt", value });
			return this;
		} else {
			return apiError("updatedAt", "string", value);
		}
	};

	parentID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "parentID", value });
			return this;
		} else {
			return apiError("parentID", "number", value);
		}
	};

	grandParentID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "grandParentID", value });
			return this;
		} else {
			return apiError("grandParentID", "number", value);
		}
	};

	installationID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "installationID", value });
			return this;
		} else {
			return apiError("installationID", "number", value);
		}
	};
}

export { UnitAPI };
