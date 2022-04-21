// Our Pages and Components
import Login from "./pages/Login/Login";
import Container from "@mui/material/Container";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import getDesignTokens from "./theme.js";

// Third Party Components
import { Routes, Route } from "react-router-dom";
import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
			}
		}),
		[]
	);
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container>
					<h1>HEADER PLACEHOLDER</h1>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/dashboard" />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</Container>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
