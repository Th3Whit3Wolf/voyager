// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Third Party Components and Utilities
import { MemoryRouter } from "react-router-dom";

// Import Features to be Tested
import App from "../../App.jsx";
import PageNotFound from "./PageNotFound.jsx";

// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

const setup = () => render(<PageNotFound />);

const rootRouteSetup = () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
}

const brokenRouteSetup = () => {
  render(
    <MemoryRouter initialEntries={['/brokenFooBar']}>
      <App />
    </MemoryRouter>
  )
}

test("renders a PageNotFound component successfully", () => {
	setup();
});

test("renders the App component and NOT PageNotFound successfully at root route", async () => {
	rootRouteSetup();
	const usernameLabel = await screen.findByLabelText(/username/i);
	expect(usernameLabel).toBeInTheDocument();
});

test("renders the PageNotFound component successfully at brokenFooBar route", async () => {
	brokenRouteSetup();
	const pageNotFoundText = await screen.findByText(/page not found/i);
	expect(pageNotFoundText).toBeInTheDocument();
});
