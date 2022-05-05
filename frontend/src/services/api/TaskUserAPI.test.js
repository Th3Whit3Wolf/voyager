import { TaskUserAPI } from "./TaskUserAPI";

describe("TaskUserAPI", () => {
	let api;
	const baseURL = "http://localhost:8081/api/v1/users/tasks";

	beforeEach(() => {
		api = new TaskUserAPI();
	});

	test(".toURL()", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test(`.progress("NOT_STARTED")`, () => {
		api.progress("NOT_STARTED");
		expect(api.toURL()).toBe(`${baseURL}?progress=NOT_STARTED`);
	});

	test(`.progress("IN_PROGRESS")`, () => {
		api.progress("IN_PROGRESS");
		expect(api.toURL()).toBe(`${baseURL}?progress=IN_PROGRESS`);
	});

	test(`.progress("COMPLETED")`, () => {
		api.progress("COMPLETED");
		expect(api.toURL()).toBe(`${baseURL}?progress=COMPLETED`);
	});

	test(`.completedAt(new Date())`, () => {
		const date = new Date();
		api.completedAt(date);
		expect(api.toURL()).toBe(`${baseURL}?completedAt=${JSON.stringify(date)}`);
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

	test(".taskID(1)", () => {
		api.taskID(1);
		expect(api.toURL()).toBe(`${baseURL}?taskID=1`);
	});

	test(".userID(1)", () => {
		api.userID(1);
		expect(api.toURL()).toBe(`${baseURL}?userID=1`);
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
