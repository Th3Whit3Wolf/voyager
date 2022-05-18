// BASE SETTINGS
import React from "react";

// Third Part Components
import {
	Container,
	Card,
	CardHeader,
	CardContent,
	Typography,
	Paper,
	useTheme,
	TextField,
	Toolbar
} from "@mui/material";

const UserSettings = ({ settings }) => {
	console.log("Settings: ", settings);
	const theme = useTheme();
	return (
		<Paper
			sx={{
				m: "0 2rem",
				borderRadius: "6px",
				boxShadow:
					theme.palette.mode === "light"
						? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
						: "0 .75em 1.5em -.185em rgba(	0, 0, 0,.9), 0 0 1px rgba(	0, 0, 0,.02)"
			}}
		>
			<Typography
				variant="h2"
				sx={{
					width: "100%",
					textAlign: "center",
					padding: "0.5rem 0",
					borderTopRightRadius: "6px",
					borderTopLeftRadius: "6px",
					backgroundColor: theme.palette.gsb.background,
					color: theme.palette.gsb.text
				}}
			>
				User Information
			</Typography>
			<Container>
				<TextField
					disabled
					id="unit-disabled"
					label="Unit"
					defaultValue={settings?.assignedUnit?.name}
					sx={{ m: "1rem 2rem", mt: "2rem", width: "calc(100% - 4rem)" }}
				/>
				<TextField
					disabled
					id="office-symbol-disabled"
					label="Office Symbol"
					defaultValue={settings?.assignedUnit?.name}
					sx={{ m: "1rem 2rem", width: "calc(100% - 4rem)" }}
				/>
				<TextField
					disabled
					id="phone-disabled"
					label="DSN"
					defaultValue={settings?.dsn}
					sx={{ m: "1rem 2rem", width: "calc(100% - 4rem)" }}
				/>
				<TextField
					disabled
					id="email-disabled"
					label="Email"
					defaultValue={settings?.email}
					sx={{ m: "1rem 2rem", width: "calc(100% - 4rem)" }}
				/>
				<TextField
					disabled
					id="firstName-disabled"
					label="First Name"
					defaultValue={settings?.firstName}
					sx={{ m: "1rem 2rem", width: "calc(100% - 4rem)" }}
				/>
				<TextField
					disabled
					id="lastName-disabled"
					label="Last Name"
					defaultValue={settings?.email}
					sx={{ m: "1rem 2rem", mb: "2rem", width: "calc(100% - 4rem)" }}
				/>
			</Container>
		</Paper>
	);
};

export default UserSettings;
