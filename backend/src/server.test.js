import request from "supertest";
import app from "./server.js";

const response = request(app);

describe("GET /status", () => {
	test("status should be good", async () => {
		const res = await response.get("/status");

		expect(res.statusCode).toBe(200);
	});
});
