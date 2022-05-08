// BASE SETTINGS
import React from "react";

// Third Part Components
import { Card, CardHeader } from "@mui/material";

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
			<Card sx={{ maxWidth: 350 }}>
				<CardHeader
					title={settings.firstName + " " + settings.lastName}
					subheader={settings.assignedOfficeSymbol}
				/>
			</Card>
		</div>
	);
};

export default UserSettings;
