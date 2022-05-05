import request from "supertest";
import app from "./server";

const response = request(app);
const routePrefix = "/api/v1";
const testData = {
	GET: {
		status: 200,
		data: {
			roles: [
				{},
				{
					id: 1,
					data: {
						kind: "SITE_ADMIN"
					}
				}
			],
			tasks: [
				{},
				{
					id: 1,
					data: {
						title: "Finance",
						description:
							"Schedule appointment for Finance in-process brief to complete PCS/PCS Travel voucher.",
						isActive: true,
						kind: "IN_PROCESSING"
					}
				}
			],
			units: [
				{},
				{
					id: 1,
					data: {
						name: "Space Operations Command",
						abbrev: "SpOC",
						kind: "COMMAND",
						function:
							"Space, cyber, and intelligence operations, and combat support"
					}
				}
			],
			users: [
				{},
				{
					id: 1,
					data: {
						firstName: "Rick",
						lastName: "Sanchez",
						email: "rick.sanchez@spaceforce.mil",
						dsn: "(312) 867-5309",
						status: "STATIONARY",
						assignedUnit: {
							id: 1
						},
						assignedOfficeSymbol: "MSOS"
					}
				}
			],
			"users/tasks": [
				{},
				{
					id: 1,
					data: {
						task: {
							id: 1
						},
						user: {
							id: 1
						},
						progress: "NOT_STARTED"
					}
				}
			]
		}
	},
	POST: {
		status: 201,
		data: {
			roles: {
				data: {
					kind: "USER"
				}
			},
			tasks: {
				data: {
					title: "New task",
					description: "Task created for test.",
					isActive: true,
					kind: "OUT_PROCESSING",
					assignerID: 66,
					approverID: 7497,
					unitID: 20
				}
			},
			units: {
				data: {
					name: "Space Delta 13 Detachment 3",
					abbrev: "DEL 13 DET 3",
					kind: "SQUADRON",
					function: "To be made up",
					location: null,
					parentID: 36,
					grandParentID: 2,
					installationID: 20
				}
			},
			users: {
				data: {
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
				}
			}
		}
	},
	PUT: {
		status: 202,
		data: {
			roles: {
				id: 1,
				data: {
					kind: "TASK_APPROVER"
				}
			},
			tasks: {
				id: 1,
				data: {
					title: "La Finance"
				}
			},
			units: {
				id: 1,
				data: {
					function: "Space Ranger headquarters"
				}
			},
			users: {
				id: 1,
				data: {
					dsn: "(312) 555-5555"
				}
			},
			"users/tasks": {
				id: 1,
				data: {
					progress: "COMPLETED"
				}
			}
		}
	},
	DELETE: {
		status: 204,
		data: {}
	}
};

/*

const deleteID = {
	roles: 7,
	tasks: 1309,
	units: 92,
	users: 8644,
	"users/tasks": 68692
};
*/
const mkTest = async (method, data, status, endpointName) => {
	const route = `${routePrefix}/${endpointName}${
		data.id !== undefined ? `/${data.id}` : ""
	}`;
	test(`${method} ${route}`, async () => {
		const res = await response[method.toLowerCase()](route);
		const { body } = res;
		if (method !== "GET") {
			console.log(
				`Route: ${method} ${routePrefix}/${endpointName}
			res = ${JSON.stringify(res)}
			Body: ${JSON.stringify(body)}`
			);
		}

		if (data.id !== undefined) {
			expect(body.data.id).toBe(data.id);
		}

		expect(res.statusCode).toBe(status);

		if (Object.keys(data).length > 0) {
			Object.entries(data.data).forEach(([property, value]) => {
				if (
					typeof value === "object" &&
					Array.isArray(value) === false &&
					value !== null
				) {
					Object.entries(value).forEach(([key, val]) => {
						expect(body.data[key]).toBe(val);
					});
				} else {
					expect(body.data[property]).toBe(value);
				}
			});
		}
	});
};

describe("Backend Tests", () => {
	test("GET /status", async () => {
		const res = await response.get("/status");
		expect(res.statusCode).toBe(200);
	});

	Object.entries(testData).forEach(([method, metadata]) => {
		describe(`METHOD ${method}`, () => {
			console.log({ method });
			Object.entries(metadata.data).forEach(
				async ([endpointName, endpointData]) => {
					if (Array.isArray(endpointData)) {
						endpointData.forEach(async data => {
							await mkTest(
								method,
								data,
								metadata.status,
								endpointName
							);
						});
					} else {
						await mkTest(
							method,
							endpointData,
							metadata.status,
							endpointName
						);
					}
				}
			);
		});
	});
});
/*
	routes.forEach(route => {
		const routeRegular = `/api/v1/${route}`;
		const routeByID = `/api/v1/${route}/1`;
		describe(`Route ${routeRegular}`, () => {
			describe(`METHOD`, () => {
				test(`GET`, async () => {
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
				const delRoute = `/api/v1/${deleteID[route]}`;
				const res = await response.delete(`${delRoute}`);
				console.log(
					`Route: ${delRoute}`,
					"Body: ",
					JSON.stringify(res.body)
				);
				expect(res.statusCode).toBe(204);
			});
		});
	});
});
*/
