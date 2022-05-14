// Import Testing Utilities
import { render, screen } from "@testing-library/react";
import getDesignTokens from "../../theme.js";
// Import Features to be Tested
import Analytics from "./Analytics.jsx";
import { analyticsMockAdmin } from "./analyticsMockAdmin.js";

// Third Party Wrappers
import { MemoryRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

describe("RTL unit tests for the Analytics Component", () => {
	const setup = (user = {}) => {
		const theme = createTheme(getDesignTokens("light"));

		return render(
			<ThemeProvider theme={theme}>
				<Router>
					<Analytics user={user} />
				</Router>
			</ThemeProvider>
		);
	};

	test("it renders a Analytics component successfully", () => {
		setup(analyticsMockAdmin);
	});

	test("it renders a set of checkboxes to inform which analytics to show", async () => {
		setup();

		const checkboxForBasic = await screen.findByRole("checkbox", {
			name: /basic/i
		});
		const checkboxForInprocessingTasks = await screen.findByRole("checkbox", {
			name: /inprocessing tasks/i
		});
		const checkboxForOutprocessingTasks = await screen.findByRole("checkbox", {
			name: /outprocessing tasks/i
		});

		expect(checkboxForBasic).toBeInTheDocument();
		expect(checkboxForInprocessingTasks).toBeInTheDocument();
		expect(checkboxForOutprocessingTasks).toBeInTheDocument();
	});
});
