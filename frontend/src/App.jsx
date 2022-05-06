// Native React
import React, { createContext, useMemo, useState } from "react";

// Our Components
import Header from "./components/Header/Header";
import { Login, Dashboard, PageNotFound } from "./pages";
import { UserContext } from "./context";
import getDesignTokens from "./theme.js";

// Third Party Components
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
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

	const [user, setUser] = useState({});
	const value = useMemo(() => ({ user, setUser }), [user]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<UserContext.Provider value={value}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Header />
					<Container
						maxWidth="fixed"
						sx={{ maxWidth: "auto" }}
						disableGutters={false}
					>
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</Container>
				</ThemeProvider>
			</UserContext.Provider>
		</ColorModeContext.Provider>
	);
}
