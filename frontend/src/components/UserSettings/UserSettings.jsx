// BASE SETTINGS
import React from "react";

// Third Part Components
import { Card } from "@mui/material";

const UserSettings = ({ settings }) => {
	console.log(settings);

	return (
		<div>
			<h1>User Settings</h1>
			<ul>
				<li>
					{" "}
					{settings.firstName} {settings.lastName}
				</li>
				<li> Email: {settings.email}</li>
				<li> DSN: {settings.dsn}</li>
			</ul>
			<Card sx={{ madWidth: 350 }}></Card>
		</div>
	);
};

export default UserSettings;
