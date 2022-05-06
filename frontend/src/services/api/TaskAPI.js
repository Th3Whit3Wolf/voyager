import { APIQueryBuilder } from "./APIQueryBuilder";
const apiError = (fnName, expected, received) => {
	throw `\n[TaskAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`;
};
const endpoint = "tasks";
const validQueryParameters = {
	id: { type: "number" },
	title: { type: "string" },
	description: { type: "string" },
	isActive: { type: "boolean" },
	kind: {
		type: "enum",
		variants: ["IN_PROCESSING", "OUT_PROCESSING"]
	},
	createdAt: {
		type: "Date"
	},
	updatedAt: {
		type: "Date"
	},
	assignerID: { type: "number" },
	approverID: { type: "number" },
	unitID: { type: "number" },
	limit: { type: "number" },
	page: { type: "number" }
};

class TaskAPI extends APIQueryBuilder {
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

	title = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "title", value });
			return this;
		} else {
			return apiError("title", "string", value);
		}
	};

	description = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "description", value });
			return this;
		} else {
			return apiError("description", "string", value);
		}
	};

	isActive = value => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "isActive", value });
			return this;
		} else {
			return apiError("isActive", "boolean", value);
		}
	};

	kind = value => {
		if (["IN_PROCESSING", "OUT_PROCESSING"].includes(value)) {
			this.addQueryParameter({ name: "kind", value });
			return this;
		} else {
			return apiError(
				"kind",
				`One of ${["IN_PROCESSING", "OUT_PROCESSING"].join(", ")}`,
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

	assignerID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "assignerID", value });
			return this;
		} else {
			return apiError("assignerID", "number", value);
		}
	};

	approverID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "approverID", value });
			return this;
		} else {
			return apiError("approverID", "number", value);
		}
	};

	unitID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "unitID", value });
			return this;
		} else {
			return apiError("unitID", "number", value);
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

export { TaskAPI };
