// Import Testing Utilities
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Import Third Party Components or Features
import { MemoryRouter as Router } from "react-router-dom";

// Import Features to be Tested
import App from "../../App.jsx";
import Login from "./Login.jsx";

// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

const setup = () => render(<Login />);

test("renders a Login component successfully", () => {
	setup();
	//expect(true).toEqual(true);
});

test("issue44: Login displays a username input field that ...", async () => {
	setup();
	const usernameLabel = await screen.findByLabelText(/username/i);
	const usernameInput = await screen.findByPlaceholderText(/enter username/i);
	expect(usernameLabel).toBeInTheDocument();
	expect(usernameInput).toBeInTheDocument();
});

test("issue44: ... accepts text for a username", async () => {
	setup();
	const usernameLabel = await screen.findByLabelText(/username/i);
	const usernameInput = await screen.findByPlaceholderText(/enter username/i);
	expect(usernameLabel).toBeInTheDocument();
	expect(usernameInput).toBeInTheDocument();
	userEvent.type(usernameInput, "scruffy");
	expect(usernameInput.value).toBe("scruffy");
});

test("issue45: Login displays a password field that accepts a password", async () => {
	setup();
	const passwordLabel = await screen.findByLabelText(/password/i);
	const passwordInput = await screen.findByPlaceholderText(/enter password/i);
	expect(passwordLabel).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
});

test("issue46: Login displays a Login Button that takes username and password for authentication", async () => {
	setup();
	const loginButton = await screen.findByRole("button", { name: /login/i });
	expect(loginButton).toBeInTheDocument();
});

test("issue47: Login displays a CAC Login button that takes CAC for authentication (note: this is faked for MVP)", () => {
	setup();
	expect(true).toEqual(false);
});
