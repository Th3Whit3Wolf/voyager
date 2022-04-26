const supertest = require("supertest");
const server = require("./server.js");

const requestWithSupertest = supertest(server);

describe("Server Runs", () => {
	it("GET /status should return a message", async () => {
		const res = await requestWithSupertest.get("/status");
		expect(res.status).toEqual(200);
		expect(res.body).toEqual("Green Status");
	});
});
