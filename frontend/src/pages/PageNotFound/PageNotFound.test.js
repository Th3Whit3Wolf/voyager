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
