// No tests yet, since there is no real dashboard.
// This is a demo dashboard as a placeholder
// thats why this test is just true === true

// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Import Features to be Tested
import SplashScreen from "./SplashScreen.jsx";

// Import Third Party Features

// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

const setup = () => render(<SplashScreen />);

test("renders a SplashScreen component successfully", () => {
	setup();
});

test("renders the text Voyager on the screen", () => {
	setup();
	const appName = screen.getByText(/voyager/i);
	expect(appName).toBeVisible();
});

test("renders the text loading Inprocessing Now on the screen", () => {
	setup();
	const appName = screen.getByText(/inprocessing now/i);
	expect(appName).toBeVisible();
});

test("renders the text loading Outprocessing Now on the screen", () => {
	setup();
	const appName = screen.getByText(/outprocessing now/i);
	expect(appName).toBeVisible();
});

test("renders the text loading Success! on the screen", () => {
	setup();
	const appName = screen.getByText(/success!/i);
	expect(appName).toBeVisible();
});
