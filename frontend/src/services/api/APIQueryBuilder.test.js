import APIQueryBuilder from "./APIQueryBuilder";

const endpoint = "users";
const baseURL = "http://localhost:8081/api/v1/users";
const validQueryParameters = {
	id: { type: "number" },
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
	sperationDate: {
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

describe("API Query Builder Test", () => {
	let api;

	beforeEach(() => {
		api = api = new APIQueryBuilder(endpoint, validQueryParameters);
	});

	it("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(`.firstName("Morris")`, () => {
		api.addQueryParameter({ name: "firstName", value: "Morris" });
		expect(api.toURL()).toBe(`${baseURL}?firstName=Morris`);
	});

	test(`.lastName("Hirthe")`, () => {
		api.addQueryParameter({ name: "lastName", value: "Hirthe" });
		expect(api.toURL()).toBe(`${baseURL}?lastName=Hirthe`);
	});
});
