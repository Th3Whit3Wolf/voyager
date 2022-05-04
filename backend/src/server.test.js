import request from "supertest";
import app from "./server";
// import routes from "./routes";

const response = request(app);

const getRoutes = ["roles", "tasks", "units", "users", "users/tasks"];
/*
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
*/
describe("GET Tests", () => {
	test("/status should be good", async () => {
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
			expect(res.statusCode).toBe(200);
			// const { json } = res;
			// expect(res.headers["Content-Type"]).toMatch(/json/);
			console.log("Response Text: ", res.text);
			console.log("Response Body: ", res.body);

			// expect(json.data.id).toBe(1);
			// Object.entries(firstID[route]).forEach(([k, v]) => {
			//	expect(json.data[k]).toBe(v);
			// });
		});
	});

	/*
	const idPairs = {
		roles: { id: 1, check: { label: "kind", value: "SITE_ADMIN" } },
		tasks: { id: 1, check: { label: "title", value: "Finance" } },
		units: {
			id: 1,
			check: { label: "name", value: "Space Operations Command" }
		},
		users: {
			id: 1,
			check: { label: "email", value: "rick.sanchez@spaceforce.mil" }
		}
	};

	/// Read all exported routes and use them

	Object.keys(routes).forEach(route => {
		test(`test full path return of getAll: ${route}`, async () => {
			const res = await response.get(`/api/v1/${route}`);
			// console.log(`/api/v1/${route} yields ->${res.text}`);
			expect(res.statusCode).toBe(200);
		});
		test(`test id specific path return of : ${route}`, async () => {
			const res = await response.get(
				`/api/v1/${route}/${idPairs[route].id}`
			);
			// console.log(
			// 	`/api/v1/${route}/${idPairs[route].id} yields ->${res.text}`
			// );
			// console.log(`--${route}--${route === "roles"}`);
			if (route === "roles") {
				console.log(res.text);
			}
			expect(res.statusCode).toBe(200);
			// const paramName = idPairs[route].check.label;
			// expect(JSON.parse(res.text)[0][paramName]).toBe(
			//	idPairs[route].check.value
			// );
		});
	});
	*/
});
