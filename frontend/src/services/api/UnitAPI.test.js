import UnitAPI from "./UnitAPI";

describe("UnitAPI", () => {
	let api;
	const baseURL = "http://localhost:8081/api/v1/units";

	beforeEach(() => {
		api = new UnitAPI();
	});

	test(".toURL()", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".baseURL()", () => {
		expect(api.baseURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test(`.name("Morris")`, () => {
		api.name("Morris");
		expect(api.toURL()).toBe(`${baseURL}?name=Morris`);
	});

	test(`.abbrev("Morris")`, () => {
		api.abbrev("Morris");
		expect(api.toURL()).toBe(`${baseURL}?abbrev=Morris`);
	});

	test(`.kind("INSTALLATION")`, () => {
		api.kind("INSTALLATION");
		expect(api.toURL()).toBe(`${baseURL}?kind=INSTALLATION`);
	});

	test(`.kind("COMMAND")`, () => {
		api.kind("COMMAND");
		expect(api.toURL()).toBe(`${baseURL}?kind=COMMAND`);
	});

	test(`.kind("DELTA")`, () => {
		api.kind("DELTA");
		expect(api.toURL()).toBe(`${baseURL}?kind=DELTA`);
	});

	test(`.kind("SQUADRON")`, () => {
		api.kind("SQUADRON");
		expect(api.toURL()).toBe(`${baseURL}?kind=SQUADRON`);
	});

	test(`.function("Morris")`, () => {
		api.function("Morris");
		expect(api.toURL()).toBe(`${baseURL}?function=Morris`);
	});

	test(`.location("Morris")`, () => {
		api.location("Morris");
		expect(api.toURL()).toBe(`${baseURL}?location=Morris`);
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

	test(".parentID(1)", () => {
		api.parentID(1);
		expect(api.toURL()).toBe(`${baseURL}?parentID=1`);
	});

	test(".grandParentID(1)", () => {
		api.grandParentID(1);
		expect(api.toURL()).toBe(`${baseURL}?grandParentID=1`);
	});

	test(".installationID(1)", () => {
		api.installationID(1);
		expect(api.toURL()).toBe(`${baseURL}?installationID=1`);
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
