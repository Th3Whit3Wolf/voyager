// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Import Features to be Tested
import Analytics from "./Analytics.jsx";

// Third Party Wrappers
import { MemoryRouter as Router } from "react-router-dom";

// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

describe("RTL unit tests for the Analytics Component", () => {
	const setup = (settings = {}) =>
		render(
			<Router>
				<Analytics />
			</Router>
		);

	test("it renders a Analytics component successfully", () => {
		setup();
	});

	test("it renders a set of checkboxes to inform which analytics to show", async () => {
		setup();

		const checkboxForInprocessingTasks = await screen.findByRole("checkbox", {
			name: "Inprocessing Tasks"
		});
		const checkboxForOutprocessingTasks = await screen.findByRole("checkbox", {
			name: "Outprocessing Tasks"
		});

		expect(checkboxForInprocessingTasks).toBeInTheDocument();
		expect(checkboxForOutprocessingTasks).toBeInTheDocument();
	});
});
