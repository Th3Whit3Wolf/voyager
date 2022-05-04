import request from "supertest";
import app from "./server";

const response = request(app);
const routes = ["roles", "tasks", "units", "users", "users/tasks"];
const getID = {
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
const post = {
	roles: {
		kind: "USER"
	},
	tasks: {
		title: "New task",
		description: "Task created for test.",
		isActive: true,
		kind: "OUT_PROCESSING",
		assignerID: 66,
		approverID: 7497,
		unitID: 20
	},
	units: {
		name: "Space Delta 13 Detachment 3",
		abbrev: "DEL 13 DET 3",
		kind: "SQUADRON",
		function: "To be made up",
		location: null,
		parentID: 36,
		grandParentID: 2,
		installationID: 20
	},
	users: {
		firstName: "Tom",
		lastName: "Anderson",
		email: "tom.anderson@myspace.com",
		dsn: "(312) 867-5309",
		auth: "",
		status: "STATIONARY",
		assignedUnitID: 1,
		assignedOfficeSymbol: "MSOS",
		gainingUnitID: null,
		gainingOfficeSymbol: null,
		roleID: 7,
		supervisorID: null
	},
	"users/tasks": {
		taskID: 162,
		userID: 7335,
		progress: "NOT_STARTED",
		completedAt: null
	}
};
const putID = {
	roles: {
		kind: "TASK_APPROVER"
	},
	tasks: {
		title: "La Finance"
	},
	units: {
		function: "Space Ranger headquarters"
	},
	users: {
		dsn: "(312) 555-5555"
	},
	"users/tasks": {
		progress: "COMPLETED"
	}
};

describe("Backend Tests", () => {
	test("GET /status", async () => {
		const res = await response.get("/status");
		expect(res.statusCode).toBe(200);
	});

	routes.forEach(route => {
		const routeRegular = `/api/v1/${route}`;
		const routeByID = `/api/v1/${route}/1`;
		describe(`Route ${routeRegular}`, () => {
			test(`GET request returns 200`, async () => {
				const res = await response.get(`${routeRegular}`);
				expect(res.statusCode).toBe(200);
			});
			test(`POST request returns 201`, async () => {
				const res = await response
					.post(`${routeRegular}`)
					.send(post[route])
					.set("Accept", "application/json");
				expect(res.statusCode).toBe(201);
			});
		});
		describe(`Route ${routeByID}`, () => {
			test(`GET request returns 200`, async () => {
				const res = await response.get(`${routeByID}`);
				const { body } = res;

				expect(res.statusCode).toBe(200);
				expect(body.data.id).toBe(1);
				Object.entries(getID[route]).forEach(([k, v]) => {
					if (
						typeof v === "object" &&
						Array.isArray(v) === false &&
						v !== null
					) {
						Object.entries(v).forEach(([k2, v2]) => {
							expect(body.data[k2]).toBe(v2);
						});
					} else {
						expect(body.data[k]).toBe(v);
					}
				});
			});
			test(`PUT request returns 202`, async () => {
				const res = await response
					.put(`${routeByID}`)
					.send(putID[route])
					.set("Accept", "application/json");
				expect(res.statusCode).toBe(202);
			});
			test(`DELETE request returns 204`, async () => {
				const res = await response.delete(`${routeByID}`);
				expect(res.statusCode).toBe(204);
			});
		});
	});
});
