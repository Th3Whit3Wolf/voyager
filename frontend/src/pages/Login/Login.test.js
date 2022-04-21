// Import Testing Utilities
import { render, screen } from "@testing-library/react";

// Import Third Party Components or Features
import { MemoryRouter as Router } from "react-router-dom";

// Import Features to be Tested
import App from "../../App.jsx";
import Login from "./Login.jsx";

const setup = () => render(<Login />);

test("renders a Login component successfully", () => setup());
