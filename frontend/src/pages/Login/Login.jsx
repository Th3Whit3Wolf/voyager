import React, { useState } from "react";

// Our Components
import SplashScreen from "../../components/SplashScreen/SplashScreen";

// Third Party Components
import { TextField, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
	// STATE
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [splashOff, setSplashOff] = useState(false);

	const navigate = useNavigate();

	// EFFECTS

	// Pseudo Effects
	new Promise((resolve, reject) => {
		setTimeout(() => {
			setSplashOff(true);
		}, 2000);
	});

	// Internal Functions

	const handleUserPass = () => {
		if (username == undefined || username.length === 0) {
			setUsername("");
			alert("Username Required");
		} else if (password == undefined || password.length === 0) {
			setPassword("");
			alert("Password Required");
		} else {
			setUsername("");
			setPassword("");
			alert(
				`Entered User: ${username} with Pass: ${password}\n\nDavid would like to handle the Firebase Config file.\n\nUpdate this functionality for auth. after that is complete. Recommend its own Context.`
			);
		}
	};

	const handleCAC = () => {
		alert(
			"Once auth is set up, fake this to essentially auto-login a default User. For MVP, no other features needed."
		);
	};

	if (splashOff === false) return <SplashScreen />;

	return (
		<>
			<Container maxWidth="sm">
				<Stack
					spacing={3}
					pb={3}
					border={2}
					lineHeight={2}
					sx={{
						justifyContent: "center",
						alignItems: "center",
						borderRadius: "25px"
					}}
				>
					<TextField
						id="username"
						label="Username"
						variant="standard"
						placeholder="Enter Username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						sx={{ minWidth: "300px" }}
					/>
					<TextField
						id="password"
						label="Password"
						variant="standard"
						placeholder="Enter Password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						sx={{ minWidth: "300px" }}
					/>
					<Button variant="contained" onClick={handleUserPass}>
						Username/Password Login
					</Button>
					<br />
					<br />
					<Button variant="contained" onClick={handleCAC}>
						Common Access Card (CAC) Login
					</Button>
				</Stack>
			</Container>

			<Stack
				py={5}
				my={3}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					alignSelf: "center"
				}}
			>
				<br />
				<br />
				<p>Delete all this and below once the Backend and Auth are Set Up</p>
				<Button
					color="error"
					variant="contained"
					onClick={() => navigate("/dashboard", { state: { role: "user" } })}
				>
					USER: Demo Dashboard
				</Button>
				<br />
				<Button
					color="error"
					variant="contained"
					onClick={() => navigate("/dashboard", { state: { role: "admin" } })}
				>
					ADMIN: Demo Dashboard
				</Button>
			</Stack>
		</>
	);
};

export default Login;
