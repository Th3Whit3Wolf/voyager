// No tests yet, since there is no real dashboard.
// This is a demo dashboard as a placeholder
// when actual dashboards are built up, switch to TDD

import React from "react";

// Third Party Components and Utilities
import { Tab, TabContext, TabList, TabPanel, Stack } from "@mui/material";

// NOTE: Currently Dashboard is taking a prop called
// role. This is coming from Login.jsx where the Fake
// User and Admin navigations pass it in order to
// emulate a type of role since the Firebase Store
// and the backend API need to be set up. I suspect
// all of this will be refactored a lot in the future
// but I just wanted to have something to attach
// Dasboard too in the Routes of App.jsx
// Please refactor and delete all this as necessary,
// This comment is just to help other developers
// read this more easily. --Tony

import { useLocation } from "react-router-dom";

const Dashboard = () => {
	const location = useLocation(); // props are being passed with navigate, so I need useLocation go grab them
	const role = location.state.role;

	// Setting up Different Views Based on Role
	// There are many ways to do conditional views, but with
	// so many possible concurrent views, early returns might be the best
	// way with a final return that always shows in the event all other
	// conditionals do not trigger

	// User View ... this conditional compares to role from location, should be changed to AUTH obj later
	if (role === "user") {
		return (
			<>
				<h1>User's Dashboard</h1>
					<div>
						<h3>Outprocessing Tasks</h3>
					</div>
					<div>
						<h3>Inprocessing Tasks</h3>
					</div>
			</>
		);
	}

	// Generic Admin View ... this conditional compares to role from location, should be changed to AUTH obj later
	if (role === "admin") {
		return <h1>Admin's Dashboard</h1>;
	}

	// Installation Admin View

	// Site Admin View

	// Generic View to Show if All Else Fails
	return (
		<>
			<h2>This is a Default Catchall View</h2>
			<p>Somehow authenticated but not as a viable role and made it here.</p>
		</>
	);
};

export default Dashboard;
