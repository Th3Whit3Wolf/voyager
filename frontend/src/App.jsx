// Our Pages and Components
import Login from "./pages/Login/Login";

// Third Party Components
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<Container>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
