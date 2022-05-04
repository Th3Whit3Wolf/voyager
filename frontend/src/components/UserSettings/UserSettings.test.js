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
		firstName: "Bridget"
	};
	setup(stgs);
	const firstName = await screen.findByText(/bridget/i);
	expect(firstName).toBeInTheDocument();
});

test("renders a last name successfully", async () => {
	const stgs = {
		id: "68",
		firstName: "Bridget",
		lastName: "Smitham"
	};
	setup(stgs);
	const lastName = await screen.findByText(/smitham/i);
	expect(lastName).toBeInTheDocument();
});
