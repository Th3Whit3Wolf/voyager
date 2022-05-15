import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import getDesignTokens from "../../theme.js";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme(getDesignTokens("light"));

describe("Header", () => {
	afterEach(cleanup);
	test('Title "Voyager" renders', () => {
		render(
			<ThemeProvider theme={theme}>
				<Header />
			</ThemeProvider>,
			{ wrapper: MemoryRouter }
		);
		const title = screen.getByText("Voyager");
		expect(title).toBeInTheDocument();
	});
});
