/* eslint-disable indent */
import request from "supertest";
import app from "#server";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.VITE_REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VITE_REACT_APP_FIREBASE_APP_ID
};

const { TEST_EMAIL, TEST_PASSWORD } = process.env;

const registrarAuth = firebase.initializeApp(firebaseConfig).auth();
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
					data: {},
					validate: {
						id: 1,
						kind: "SITE_ADMIN"
					}
				}
			],
			tasks: [
				{},
				{
					id: 1,
					data: {},
					validate: {
						id: 1,
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
					data: {},
					validate: {
						id: 1,
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
					data: {},
					validate: {
						id: 1,
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
					data: {},
					validate: {
						id: 1,
						task: {
							id: 1
						},
						user: {
							id: 1
						}
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
					img: "/img/SpOC_Template.png",
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
		data: {
			roles: {
				id: 7
			},
			tasks: {
				id: 1200
			},
			units: {
				id: 80
			},
			users: {
				id: 8000
			},
			"users/tasks": {
				id: 60000
			}
		}
	}
};

let token;

beforeAll(async () => {
	const userCred = await signInWithEmailAndPassword(
		registrarAuth,
		TEST_EMAIL,
		TEST_PASSWORD
	);
	token = await userCred.getIdToken();
});

const mkTest = async (method, data, status, endpointName) => {
	const route = `${routePrefix}/${endpointName}${
		data.id !== undefined ? `/${data.id}` : ""
	}`;
	test(`${method} ${route}`, async () => {
		const res =
			method === "GET" || method === "DELETE"
				? await response[method.toLowerCase()](route)
				: await response[method.toLowerCase()](route)
						.send(data.data)
						.set("Accept", "application/json")
						.set("Authorization", `Bearer ${token}`);

		const { body } = res;
		expect(res.statusCode).toBe(status);

		if (
			data.validate !== undefined &&
			Object.keys(data.validate).length > 0
		) {
			Object.entries(data.validate).forEach(([property, value]) => {
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
	describe("Express Actuator Endpoints", () => {
		test("GET /info", async () => {
			const res = await response.get("/info");
			expect(res.statusCode).toBe(200);
			expect(res.body.build.name).toBe("voyager-backend");
		});

		test("GET /metrics", async () => {
			const res = await response.get("/metrics");
			expect(res.statusCode).toBe(200);
		});

		test("GET /health", async () => {
			const res = await response.get("/health");
			expect(res.statusCode).toBe(200);
		});
	});

	Object.entries(testData).forEach(([method, metadata]) => {
		describe(`METHOD ${method}`, () => {
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
