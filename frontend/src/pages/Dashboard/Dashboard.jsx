// No tests yet, since there is no real dashboard.
// This is a demo dashboard as a placeholder

import React from "react";

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

  console.log(location);

 	return (
		<>
			<h3>DASHBOARD for {}</h3>
		</>
	);
};

export default Dashboard;
