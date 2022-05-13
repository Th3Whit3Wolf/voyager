import APIQueryBuilder from "./APIQueryBuilder";
const apiError = (fnName, expected, received) => {
	throw `\n[TaskUserAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`;
};
const endpoint = "users/tasks";
const validQueryParameters = {
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
	userID: { type: "number" }
};

class TaskUserAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

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
}

export default TaskUserAPI;
