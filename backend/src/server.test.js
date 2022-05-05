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
		status: "STATIONARY",
		assignedUnit: {
			id: 1
		},
		assignedOfficeSymbol: "MSOS"
	},
	"users/tasks": {
		task: {
			id: 1
		},
		user: {
			id: 1
		},
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
			if (body.data.id === undefined) {
				console.log(`[TEST]::(GET /api/v1/${route}/1) Failed
Body: ${body}
Body JSON: ${JSON.stringify(body)}
Data ${body.data}
Data JSON: ${JSON.stringify(body.data)}
Field: id
Value: 1
Expected: Data.id to exist
					`);
			}
			expect(body.data.id).toBe(1);
			Object.entries(firstID[route]).forEach(([k, v]) => {
				if (
					typeof v === "object" &&
					Array.isArray(v) === false &&
					v !== null
				) {
					Object.entries(v).forEach(([k2, v2]) => {
						if (body.data[k2] === undefined) {
							console.log(`[TEST]::(GET /api/v1/${route}/1) Failed
Body: ${body}
Body JSON: ${JSON.stringify(body)}
Data ${body.data}
Data JSON: ${JSON.stringify(body.data)}
Field: ${k2}
Value: ${v2}
Expected: Data.${k2} to exist
					`);
							console.log({ body });
						}
						expect(body.data[k2]).toBe(v2);
					});
				} else {
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
				}
			});
		});
	});
});
