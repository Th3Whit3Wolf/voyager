// BASE SETTINGS
import React from "react";

// Third Part Components
import {
	Container,
	Card,
	CardHeader,
	CardContent,
	Typography
} from "@mui/material";

const UserSettings = ({ settings }) => {
	console.log(settings);

	return (
		<Container>
			<h2>{settings.firstName + " " + settings.lastName}</h2>
			<Card>
				<CardHeader
					title={
						"Current Unit: " +
						settings.assignedOfficeSymbol +
						" : " +
						settings.assignedUnit.name
					}
					subheader={"Status: " + settings.status.replaceAll("_", " ")}
				/>
				<CardContent>
					<Typography>Your Contact Information</Typography>
					<Typography>DSN: {settings.dsn}</Typography>
					<Typography>Email: {settings.email}</Typography>
				</CardContent>
				<CardContent>
					<Typography>Supervisor Contact Information</Typography>
					<Typography>
						Name:{" "}
						{settings?.supervisor?.firstName +
							" " +
							settings?.supervisor?.lastName}
					</Typography>
					<Typography>DSN: {settings?.supervisor?.dsn}</Typography>
					<Typography>Email: {settings?.supervisor?.email}</Typography>
				</CardContent>
			</Card>

			<h3>Subordinates</h3>
			<Card>
				<CardContent>
					{settings.subordinates.map(sub => (
						<Typography key={sub.id}>
							{sub.firstName + " " + sub.lastName}
						</Typography>
					))}
				</CardContent>
			</Card>
		</Container>
	);
};

export default UserSettings;
