import React, { useState, useEffect } from "react";

// Third Party Components
import { InputLabel, Input } from "@mui/material";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		console.log(username, password);
	}, [username, password]);

	return (
		<div>
			<InputLabel htmlFor="username">Username </InputLabel>
			<Input
				type="text"
				id="username"
				placeholder="Enter Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>

			<InputLabel htmlFor="password">Password </InputLabel>
			<Input
				type="password"
				id="password"
				placeholder="Enter Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
		</div>
	);
};

export default Login;
