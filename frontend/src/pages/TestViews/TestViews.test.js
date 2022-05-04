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

const setup = () =>
	render(
		<Router>
			<TestViews />
		</Router>
	);

test("renders a TestViews component successfully", () => {
	setup();
});
