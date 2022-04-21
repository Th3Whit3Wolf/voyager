import React, { useState, useEffect } from "react";

// Third Party Components
import { InputLabel, Input, TextField, Button } from "@mui/material";

// Styling
import { Stack } from "@mui/material";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		console.log(username, password);
	}, [username, password]);

	return (
		<Stack spacing={2}>
			<TextField
				id="username"
				label="Username"
				variant="standard"
				placeholder="Enter Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<div>
				<InputLabel htmlFor="password">Password </InputLabel>
				<Input
					type="password"
					id="password"
					placeholder="Enter Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<Button>Username/Password Login</Button>
			<Button>Common Access Card (CAC) Login</Button>
		</Stack>
	);
};

export default Login;
