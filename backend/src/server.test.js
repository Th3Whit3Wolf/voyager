import request from "supertest";
import app from "./server";
import routes from "./routes";

const response = request(app);

describe("GET Tests", () => {
	test("/status should be good", async () => {
		const res = await response.get("/status");

		expect(res.statusCode).toBe(200);
	});

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
});
