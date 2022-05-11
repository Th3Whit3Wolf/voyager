import { UserAPI } from "./UserAPI";

describe("UserAPI", () => {
	let api;
	const baseURL = "http://localhost:8081/api/v1/users";

	beforeEach(() => {
		api = new UserAPI();
	});

	test(".toURL()", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(66)", () => {
		api.id(66);
		expect(api.toURL()).toBe(`${baseURL}?id=66`);
	});

	test(`.firstName("Morris")`, () => {
		api.firstName("Morris");
		expect(api.toURL()).toBe(`${baseURL}?firstName=Morris`);
	});

	test(`.lastName("Hirthe")`, () => {
		api.lastName("Hirthe");
		expect(api.toURL()).toBe(`${baseURL}?lastName=Hirthe`);
	});

	test(`.email("morris.hirthe@spaceforce.mil")`, () => {
		api.email("morris.hirthe@spaceforce.mil");
		expect(api.toURL()).toBe(`${baseURL}?email=morris.hirthe@spaceforce.mil`);
	});

	test(`.dsn()`, () => {
		api.dsn("(312) 758-3775");
		expect(api.toURL()).toBe(`${baseURL}?dsn=(312) 758-3775`);
	});

	test(`.status("IN_PROCESSING")`, () => {
		api.status("IN_PROCESSING");
		expect(api.toURL()).toBe(`${baseURL}?status=IN_PROCESSING`);
	});

	test(`.status("IN_TRANSIT")`, () => {
		api.status("IN_TRANSIT");
		expect(api.toURL()).toBe(`${baseURL}?status=IN_TRANSIT`);
	});

	test(`.status("OUT_PROCESSING")`, () => {
		api.status("OUT_PROCESSING");
		expect(api.toURL()).toBe(`${baseURL}?status=OUT_PROCESSING`);
	});

	test(`.status("OUT_PROCESSING_WITH_ORDERS")`, () => {
		api.status("OUT_PROCESSING_WITH_ORDERS");
		expect(api.toURL()).toBe(`${baseURL}?status=OUT_PROCESSING_WITH_ORDERS`);
	});

	test(`.status("STATIONARY")`, () => {
		api.status("STATIONARY");
		expect(api.toURL()).toBe(`${baseURL}?status=STATIONARY`);
	});

	test(`.separationDate(new Date())`, () => {
		const date = new Date();
		api.separationDate(date);
		expect(api.toURL()).toBe(
			`${baseURL}?separationDate=${JSON.stringify(date)}`
		);
	});

	test(`.createdAt(new Date())`, () => {
		const date = new Date();
		api.createdAt(date);
		expect(api.toURL()).toBe(`${baseURL}?createdAt=${JSON.stringify(date)}`);
	});

	test(`.updatedAt(new Date())`, () => {
		const date = new Date();
		api.updatedAt(date);
		expect(api.toURL()).toBe(`${baseURL}?updatedAt=${JSON.stringify(date)}`);
	});

	test(".assignedUnitID(3)", () => {
		api.assignedUnitID(3);
		expect(api.toURL()).toBe(`${baseURL}?assignedUnitID=3`);
	});

	test(".gainingUnitID(3)", () => {
		api.gainingUnitID(3);
		expect(api.toURL()).toBe(`${baseURL}?gainingUnitID=3`);
	});

	test(".roleID(4)", () => {
		api.roleID(4);
		expect(api.toURL()).toBe(`${baseURL}?roleID=4`);
	});

	test(".supervisorID(3)", () => {
		api.supervisorID(3);
		expect(api.toURL()).toBe(`${baseURL}?supervisorID=3`);
	});

	test(".limit(20)", () => {
		api.limit(20);
		expect(api.toURL()).toBe(`${baseURL}?limit=20`);
	});

	test(".page(1)", () => {
		api.page(1);
		expect(api.toURL()).toBe(`${baseURL}?page=1`);
	});
});
