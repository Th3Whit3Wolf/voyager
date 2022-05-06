import { APIQueryBuilder } from "./APIQueryBuilder";
const apiError = (fnName, expected, received) => {
	throw `\n[RoleAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`;
};
const endpoint = "roles";
const validQueryParameters = {
	id: { type: "number" },
	kind: {
		type: "enum",
		variants: [
			"USER",
			"TASK_APPROVER",
			"SITE_ADMIN",
			"COMMAND_ADMIN",
			"INSTALLATION_ADMIN",
			"DELTA_ADMIN",
			"SQUADRON_ADMIN"
		]
	},
	createdAt: {
		type: "Date"
	},
	updatedAt: {
		type: "Date"
	},
	limit: { type: "number" },
	page: { type: "number" }
};

class RoleAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}
	id = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "id", value });
			return this;
		} else {
			return apiError("id", "number", value);
		}
	};

	kind = value => {
		if (
			[
				"USER",
				"TASK_APPROVER",
				"SITE_ADMIN",
				"COMMAND_ADMIN",
				"INSTALLATION_ADMIN",
				"DELTA_ADMIN",
				"SQUADRON_ADMIN"
			].includes(value)
		) {
			this.addQueryParameter({ name: "kind", value });
			return this;
		} else {
			return apiError(
				"kind",
				`One of ${[
					"USER",
					"TASK_APPROVER",
					"SITE_ADMIN",
					"COMMAND_ADMIN",
					"INSTALLATION_ADMIN",
					"DELTA_ADMIN",
					"SQUADRON_ADMIN"
				].join(", ")}`,
				value
			);
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

	limit = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "limit", value });
			return this;
		} else {
			return apiError("limit", "number", value);
		}
	};

	page = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "page", value });
			return this;
		} else {
			return apiError("page", "number", value);
		}
	};
}

export { RoleAPI };
