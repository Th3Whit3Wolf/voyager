import React, { useState } from "react";

// Third Party Components
import { TextField, Button, Stack } from "@mui/material";

const Login = () => {
	// STATE
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// EFFECTS

	// Internal Functions

	const handleUserPass = () => {
		if (username == undefined || username.length === 0) {
			setUsername("");
			alert("Username Required");
		} else if (password == undefined || password.length === 0) {
			setPassword("");
			alert("Password Required");
		} else {
			alert(
				`Entered User: ${username} with Pass: ${password}\n\nDavid would like to handle the Firebase Config file.\n\nUpdate this functionality for auth. after that is complete. Recommend its own Context.`
			);
		}
	};
	return (
		<Stack
			spacing={3}
			style={{ justifyContent: "center", alignItems: "center" }}
		>
			<TextField
				id="username"
				label="Username"
				variant="standard"
				placeholder="Enter Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
				style={{ minWidth: "300px" }}
			/>
			<TextField
				id="password"
				label="Password"
				variant="standard"
				placeholder="Enter Password"
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				style={{ minWidth: "300px" }}
			/>
			<Button variant="contained" onClick={handleUserPass}>
				Username/Password Login
			</Button>
			<br />
			<br />
			<Button variant="contained">Common Access Card (CAC) Login</Button>
		</Stack>
	);
};

export default Login;
