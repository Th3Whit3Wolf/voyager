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
		commands: {
			id: 1,
			check: { label: "name", value: "Space Operations Command" }
		},
		deltas: { id: 24, check: { label: "name", value: "Space Delta 3" } },
		installations: {
			id: 3,
			check: { label: "name", value: "Peterson Space Force Base" }
		},
		squadrons: {
			id: 37,
			check: { label: "name", value: "328th Weapons Squadron" }
		},
		roles: { id: 2, check: { label: "kind", value: "COMMAND_ADMIN" } },
		users: { id: 1 }
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
