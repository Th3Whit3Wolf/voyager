import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
	afterEach(cleanup);
	test('Title "Voyager" renders', () => {
		render(<Header />, { wrapper: MemoryRouter });
		const title = screen.getByText("Voyager");
		expect(title).toBeInTheDocument();
	});
});
