import React from "react";

// Third Party Components and Utilities
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
	return (
		<main>
			<h2>Page Not Found</h2>
			<p>Either...</p>
			<NavLink to="/">Return to Login Page</NavLink>
			<p>or...</p>
			<NavLink to="/dashboard">Try to Access your Dashboard</NavLink>
		</main>
	);
};

export default PageNotFound;
