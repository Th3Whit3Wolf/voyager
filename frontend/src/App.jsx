import { useState } from "react";
import "./App.css";

// Our Pages and Components
import Login from "./pages/Login/Login";

// Third Party Components
import { Routes, Route } from "react-router-dom";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<h1>Voyager Placeholder</h1>
			<p>Will show null Outlets until Route elements set up</p>
			<p>
				This scaffolding was added in order to just instantiate React Router for
				the DOM and to give tests something to grab onto as we all work on
				components and pages.
			</p>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/dashboard" />
			</Routes>
		</div>
	);
}

export default App;
