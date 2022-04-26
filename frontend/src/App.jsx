import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import getDesignTokens from "./theme.js";

// Third Party Components
import { createContext, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
const RoleContext = createContext({role: "user", setRole: () => {}});
export default function App() {
	//role = 0 makes it a basic user, role = 1 makes it an admin
	const [role, setRole] = useState("user");
	const roleContextValue = {role, setRole};
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
		<RoleContext.Provider value={roleContextValue}>
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Container maxWidth="xl">
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</Container>
			</ThemeProvider>
		</ColorModeContext.Provider>
		</RoleContext.Provider>
	);
}
