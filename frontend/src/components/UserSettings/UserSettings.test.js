// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Import Features to be Tested
import UserSettings from "./UserSettings.jsx";

// Third Party Wrappers
import { MemoryRouter as Router } from "react-router-dom";

// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

const setup = (settings = {}) =>
	render(
		<Router>
			<UserSettings settings={settings} />
		</Router>
	);

test("renders a UserSettings component successfully", () => {
	setup();
});

test("renders a first name successfully", async () => {
	const stgs = {
		id: "68",
		firstName: "Sherri"
	};
	setup(stgs);
	const firstName = await screen.findByText(/sherri/i);
	expect(firstName).toBeInTheDocument();
});

test("renders a last name successfully", async () => {
	const stgs = {
		id: "68",
		firstName: "Sherri",
		lastName: "Ortiz"
	};
	setup(stgs);
	const lastName = await screen.findByText(/ortiz/i);
	expect(lastName).toBeInTheDocument();
});

test("renders email successfully", async () => {
	const stgs = {
		id: "68",
		firstName: "Sherri",
		lastName: "Ortiz",
		email: "sherri.ortiz@spaceforce.mil"
	};
	setup(stgs);
	const email = await screen.findByText(/sherri.ortiz@spaceforce.mil/i);
	expect(email).toBeInTheDocument();
});

// test("renders DSN successfully", async () => {
// 	const stgs = {
// 		id: "68",
// 		firstName: "Sherri",
// 		lastName: "Ortiz",
// 		email: "sherri.ortiz@spaceforce.mil",
// 		dsn: "(312) 713-3278"
// 	};
// 	setup(stgs);
// 	const dsn = await screen.findByText(/(312) 713-3278/i);
// 	expect(dsn).toBeInTheDocument();
// });
