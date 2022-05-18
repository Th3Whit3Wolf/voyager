// Native React
import React, { createContext, useMemo, useState } from "react";

// Third Party Components
import { Routes, Route } from "react-router-dom";
import {
	Box,
	Toolbar,
	createTheme,
	CssBaseline,
	ThemeProvider,
	useMediaQuery
} from "@mui/material";

// Our Components
import { Header, SideBar } from "#components";
import { Login, Dashboard, PageNotFound } from "#pages";
import { PageContext, UserContext, ColorModeContext } from "#context";
import getDesignTokens from "./theme.js";

export default function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
	const [page, setPage] = useState("");
	const [user, setUser] = useState({});
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
	const usr = useMemo(() => ({ user, setUser }), [user]);
	const pg = useMemo(() => ({ page, setPage }), [page]);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<UserContext.Provider value={usr}>
				<PageContext.Provider value={pg}>
					<ThemeProvider theme={theme}>
						<Box sx={{ display: "flex" }}>
							<CssBaseline />
							<Header />
							<SideBar />
							<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
								<Toolbar />
								<Toolbar />

								<Routes>
									<Route path="/" element={<Login />} />
									<Route path="/dashboard" element={<Dashboard />} />
									<Route path="*" element={<PageNotFound />} />
								</Routes>
							</Box>
						</Box>
					</ThemeProvider>
				</PageContext.Provider>
			</UserContext.Provider>
		</ColorModeContext.Provider>
	);
}
