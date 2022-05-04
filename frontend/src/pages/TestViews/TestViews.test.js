// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Import Features to be Tested
import TestViews from "./TestViews.jsx";

// Third Party Wrappers
import { MemoryRouter as Router } from "react-router-dom";

// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

const setup = rt =>
	render(
		<Router>
			<TestViews rt={rt} />
		</Router>
	);

test("renders a TestViews component successfully", () => {
	setup();
});

test("TestViews has an input field which can take a string to change fetch endpoints", async () => {
	setup();
	const urlInputField = await screen.findByRole(/input/i);
	expect(urlInputField).toBeInTheDocument();
});

test("TestViews can render a Specific User when a Specific User is fetched", async () => {
	setup("/users/1");

	const firstName = await screen.findByText(/rick/i);
	const lastName = await screen.findByText(/sanchez/i);
	const email = await screen.findByText(/rick.sanchez@spaceforce.mil/i);
	const dsn = await screen.findByText(/(312) 867-5309/i);

	expect(firstName).toBeInTheDocument();
	expect(lastName).toBeInTheDocument();
	expect(email).toBeInTheDocument();
	expect(dsn).toBeInTheDocument();
});
