import { TaskAPI } from "./TaskAPI";

describe("TaskAPI", () => {
	let api;
	const baseURL = "http://localhost:8081/api/v1/tasks";

	beforeEach(() => {
		api = new TaskAPI();
	});

	test(".toURL()", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test(`.title("Morris")`, () => {
		api.title("Morris");
		expect(api.toURL()).toBe(`${baseURL}?title=Morris`);
	});

	test(`.description("Morris")`, () => {
		api.description("Morris");
		expect(api.toURL()).toBe(`${baseURL}?description=Morris`);
	});

	test(`.isActive(true)`, () => {
		api.isActive(true);
		expect(api.toURL()).toBe(`${baseURL}?isActive=true`);
	});

	test(`.kind("IN_PROCESSING")`, () => {
		api.kind("IN_PROCESSING");
		expect(api.toURL()).toBe(`${baseURL}?kind=IN_PROCESSING`);
	});

	test(`.kind("OUT_PROCESSING")`, () => {
		api.kind("OUT_PROCESSING");
		expect(api.toURL()).toBe(`${baseURL}?kind=OUT_PROCESSING`);
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

	test(".assignerID(1)", () => {
		api.assignerID(1);
		expect(api.toURL()).toBe(`${baseURL}?assignerID=1`);
	});

	test(".approverID(1)", () => {
		api.approverID(1);
		expect(api.toURL()).toBe(`${baseURL}?approverID=1`);
	});

	test(".unitID(1)", () => {
		api.unitID(1);
		expect(api.toURL()).toBe(`${baseURL}?unitID=1`);
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
