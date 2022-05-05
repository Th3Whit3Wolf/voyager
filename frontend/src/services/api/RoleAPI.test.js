import { RoleAPI } from "./RoleAPI";

describe("RoleAPI", () => {
	let api;
	const baseURL = "http://localhost:8081/api/v1/roles";

	beforeEach(() => {
		api = new RoleAPI();
	});

	test(".toURL()", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test(`.kind("USER")`, () => {
		api.kind("USER");
		expect(api.toURL()).toBe(`${baseURL}?kind=USER`);
	});

	test(`.kind("TASK_APPROVER")`, () => {
		api.kind("TASK_APPROVER");
		expect(api.toURL()).toBe(`${baseURL}?kind=TASK_APPROVER`);
	});

	test(`.kind("SITE_ADMIN")`, () => {
		api.kind("SITE_ADMIN");
		expect(api.toURL()).toBe(`${baseURL}?kind=SITE_ADMIN`);
	});

	test(`.kind("COMMAND_ADMIN")`, () => {
		api.kind("COMMAND_ADMIN");
		expect(api.toURL()).toBe(`${baseURL}?kind=COMMAND_ADMIN`);
	});

	test(`.kind("INSTALLATION_ADMIN")`, () => {
		api.kind("INSTALLATION_ADMIN");
		expect(api.toURL()).toBe(`${baseURL}?kind=INSTALLATION_ADMIN`);
	});

	test(`.kind("DELTA_ADMIN")`, () => {
		api.kind("DELTA_ADMIN");
		expect(api.toURL()).toBe(`${baseURL}?kind=DELTA_ADMIN`);
	});

	test(`.kind("SQUADRON_ADMIN")`, () => {
		api.kind("SQUADRON_ADMIN");
		expect(api.toURL()).toBe(`${baseURL}?kind=SQUADRON_ADMIN`);
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

	test(".limit(20)", () => {
		api.limit(20);
		expect(api.toURL()).toBe(`${baseURL}?limit=20`);
	});

	test(".page(1)", () => {
		api.page(1);
		expect(api.toURL()).toBe(`${baseURL}?page=1`);
	});
});
