// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Import Third Party Components or Features
import { MemoryRouter as Router } from "react-router-dom";

// Import Features to be Tested
import App from "../../App.jsx";
import Login from "./Login.jsx";

const setup = () => render(<Login />);

test("renders a Login component successfully", () => {
	setup();
	//expect(true).toEqual(true);
});

test("issue44: Login displays a username field that accepts text for a username", () => {
	setup();
	expect(true).toEqual(false);
});

test("issue45: Login displays a password field that accepts a password", () => {
	setup();
	expect(true).toEqual(false);
});

test("issue46: Login displays a Login Button that takes username and password for authentication", () => {
	setup();
	expect(true).toEqual(false);
});

test("issue47: Login displays a CAC Login button that takes CAC for authentication (note: this is faked for MVP)", () => {
	setup();
	expect(true).toEqual(false);
});
