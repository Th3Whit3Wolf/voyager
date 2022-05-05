import { APIQueryBuilder } from "./APIQueryBuilder";
const apiError = (fnName, expected, received) => {
	throw `\n[TaskUserAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`;
};
const endpoint = "users/tasks";
const validQueryParameters = {
	id: { type: "number" },
	progress: {
		type: "enum",
		variants: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]
	},
	completedAt: {
		type: "Date"
	},
	createdAt: {
		type: "Date"
	},
	updatedAt: {
		type: "Date"
	},
	taskID: { type: "number" },
	userID: { type: "number" },
	limit: { type: "number" },
	page: { type: "number" }
};

class TaskUserAPI extends APIQueryBuilder {
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

	progress = value => {
		if (["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].includes(value)) {
			this.addQueryParameter({ name: "progress", value });
			return this;
		} else {
			return apiError(
				"progress",
				`One of ${["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].join(", ")}`,
				value
			);
		}
	};

	completedAt = value => {
		if (value instanceof Date && !isNaN(value)) {
			this.addQueryParameter({ name: "completedAt", value });
			return this;
		} else {
			return apiError("completedAt", "string", value);
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

	taskID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "taskID", value });
			return this;
		} else {
			return apiError("taskID", "number", value);
		}
	};

	userID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "userID", value });
			return this;
		} else {
			return apiError("userID", "number", value);
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

export { TaskUserAPI };
