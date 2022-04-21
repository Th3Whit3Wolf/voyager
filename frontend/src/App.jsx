// Our Pages and Components
import Login from "./pages/Login/Login";

// Third Party Components
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Container>
			<h1>HEADER PLACEHOLDER</h1>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" />
			</Routes>
		</Container>
	);
}

export default App;
