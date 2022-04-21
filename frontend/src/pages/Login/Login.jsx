import React, { useState } from "react";

// Third Party Components
import { TextField, Button } from "@mui/material";

// Styling
import { Stack } from "@mui/material";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
				value={password}
				onChange={e => setPassword(e.target.value)}
				style={{ minWidth: "300px" }}
			/>
			<Button variant="contained">Username/Password Login</Button>
			<br />
			<br />
			<Button variant="contained">Common Access Card (CAC) Login</Button>
		</Stack>
	);
};

export default Login;
