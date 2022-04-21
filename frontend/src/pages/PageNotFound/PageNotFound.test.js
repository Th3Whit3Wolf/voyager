// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Import Features to be Tested
import PageNotFound from "./PageNotFound.jsx";

// Note that I use a setup function here instead of
// beforeAll or beforeEach due to feedback received
// from code hardening tools such as SonarCube on
// previous software projects. --Tony

const setup = () => render(<PageNotFound />);

test("renders a PageNotFound component successfully", () => {
	setup();
});
