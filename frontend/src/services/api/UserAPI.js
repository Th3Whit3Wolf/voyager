import APIQueryBuilder from "./APIQueryBuilder";
const apiError = (fnName, expected, received) => {
	throw `\n[UserAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`;
};
const endpoint = "users";
const validQueryParameters = {
	firstName: { type: "string" },
	lastName: { type: "string" },
	email: { type: "string" },
	dsn: { type: "string" },
	assignedOfficeSymbol: { type: "string" },
	gainingOfficeSymbol: { type: "string" },
	status: {
		type: "enum",
		variants: [
			"IN_PROCESSING",
			"IN_TRANSIT",
			"OUT_PROCESSING",
			"OUT_PROCESSING_WITH_ORDERS",
			"STATIONARY"
		]
	},
	separationDate: {
		type: "Date"
	},
	createdAt: {
		type: "Date"
	},
	updatedAt: {
		type: "Date"
	},
	assignedUnitID: { type: "number" },
	gainingUnitID: { type: "number" },
	roleID: { type: "number" },
	supervisorID: { type: "number" }
};

class UserAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	firstName = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "firstName", value });
			return this;
		} else {
			return apiError("firstName", "string", value);
		}
	};

	lastName = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "lastName", value });
			return this;
		} else {
			return apiError("lastName", "string", value);
		}
	};

	email = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "email", value });
			return this;
		} else {
			return apiError("email", "string", value);
		}
	};

	dsn = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "dsn", value });
			return this;
		} else {
			return apiError("dsn", "string", value);
		}
	};

	assignedOfficeSymbol = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "assignedOfficeSymbol", value });
			return this;
		} else {
			return apiError("assignedOfficeSymbol", "string", value);
		}
	};

	gainingOfficeSymbol = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "gainingOfficeSymbol", value });
			return this;
		} else {
			return apiError("gainingOfficeSymbol", "string", value);
		}
	};

	status = value => {
		if (
			[
				"IN_PROCESSING",
				"IN_TRANSIT",
				"OUT_PROCESSING",
				"OUT_PROCESSING_WITH_ORDERS",
				"STATIONARY"
			].includes(value)
		) {
			this.addQueryParameter({ name: "status", value });
			return this;
		} else {
			return apiError(
				"status",
				`One of ${[
					"IN_PROCESSING",
					"IN_TRANSIT",
					"OUT_PROCESSING",
					"OUT_PROCESSING_WITH_ORDERS",
					"STATIONARY"
				].join(", ")}`,
				value
			);
		}
	};

	separationDate = value => {
		if (value instanceof Date && !isNaN(value)) {
			this.addQueryParameter({ name: "separationDate", value });
			return this;
		} else {
			return apiError("separationDate", "string", value);
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

	assignedUnitID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "assignedUnitID", value });
			return this;
		} else {
			return apiError("assignedUnitID", "number", value);
		}
	};
	gainingUnitID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "gainingUnitID", value });
			return this;
		} else {
			return apiError("gainingUnitID", "number", value);
		}
	};

	roleID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "roleID", value });
			return this;
		} else {
			return apiError("roleID", "number", value);
		}
	};

	supervisorID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "supervisorID", value });
			return this;
		} else {
			return apiError("supervisorID", "number", value);
		}
	};
}

export default UserAPI;
