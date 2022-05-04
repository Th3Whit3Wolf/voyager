import request from "supertest";
import app from "./server";

const response = request(app);
const getRoutes = ["roles", "tasks", "units", "users", "users/tasks"];
const firstID = {
	roles: {
		kind: "SITE_ADMIN"
	},
	tasks: {
		title: "Finance",
		description:
			"Schedule appointment for Finance in-process brief to complete PCS/PCS Travel voucher.",
		isActive: true,
		kind: "IN_PROCESSING"
	},
	units: {
		name: "Space Operations Command",
		abbrev: "SpOC",
		kind: "COMMAND",
		function:
			"Space, cyber, and intelligence operations, and combat support"
	},
	users: {
		firstName: "Rick",
		lastName: "Sanchez",
		email: "rick.sanchez@spaceforce.mil",
		dsn: "(312) 867-5309",
		auth: "",
		status: "STATIONARY",
		assignedUnitID: 1,
		assignedOfficeSymbol: "MSOS"
	},
	"users/tasks": {
		taskID: 1,
		userID: 68,
		progress: "NOT_STARTED"
	}
};

describe("Backend Tests", () => {
	test("GET /status", async () => {
		const res = await response.get("/status");
		expect(res.statusCode).toBe(200);
	});

	getRoutes.forEach(route => {
		test(`GET /api/v1/${route}`, async () => {
			const res = await response.get(`/api/v1/${route}`);
			expect(res.statusCode).toBe(200);
		});

		test(`GET /api/v1/${route}/1`, async () => {
			const res = await response.get(`/api/v1/${route}/1`);
			const { body } = res;

			expect(res.statusCode).toBe(200);
			expect(body.data.id).toBe(1);
			Object.entries(firstID[route]).forEach(([k, v]) => {
				if (body.data[k] === undefined) {
					console.log(`[TEST]::(GET /api/v1/${route}/1) Failed
Body: ${body}
Body JSON: ${JSON.stringify(body)}
Data ${body.data}
Data JSON: ${JSON.stringify(body.data)}
Field: ${k}
Value: ${v}
Expected: Data.${k} to exist
					`);
					console.log({ body });
				}
				expect(body.data[k]).toBe(v);
			});
		});
	});
});
