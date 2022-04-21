import { useState } from "react";
import "./App.css";
import Header from "/components/Header/Header";

// Third Party Components
import { Routes, Route } from "react-router-dom";

// Notes: path="/" will use element Login component from issue43
// Notes: path='/dashboard' will use element with a changing view based on Role
//.    this can be most easily achieved through early returns on a Dashboard element

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
				<Route path="/" />
				<Route path="/dashboard" />
			</Routes>
		</div>
	);
}

export default App;
