// Our Pages and Components
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

// Third Party Components
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";

// Notes: path="/" will use element Login component from issue43
// Notes: path='/dashboard' will use element with a changing view based on Role
//.    this can be most easily achieved through early returns on a Dashboard element

function App() {
	return (
		<Container>
			<h1>HEADER PLACEHOLDER</h1>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Container>
	);
}

export default App;
