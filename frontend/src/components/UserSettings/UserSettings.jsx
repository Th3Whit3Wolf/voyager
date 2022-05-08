// BASE SETTINGS
import React from "react";

// Third Part Components
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

const UserSettings = ({ settings }) => {
	console.log(settings);

	return (
		<div>
			<h2>{settings.firstName + " " + settings.lastName}</h2>
			<Card sx={{ maxWidth: 350 }}>
				<CardHeader title={"Current Unit: " + settings.assignedOfficeSymbol} />
				<CardContent>
					<Typography>Your Contact Information</Typography>
					<Typography>DSN: {settings.dsn}</Typography>
					<Typography>Email: {settings.email}</Typography>
				</CardContent>
				<CardContent>
					<Typography>Supervisor Contact Information</Typography>
					<Typography>
						Name:{" "}
						{settings.supervisor.firstName + " " + settings.supervisor.lastName}
					</Typography>
					<Typography>DSN: {settings.supervisor.dsn}</Typography>
					<Typography>Email: {settings.supervisor.email}</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default UserSettings;
