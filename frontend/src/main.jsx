import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Third Party Components
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>
);
