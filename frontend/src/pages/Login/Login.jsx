import React, { useState, useEffect } from "react";

const Login = () => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		console.log(username);
	}, [username]);

	return (
		<div>
			<label htmlFor="username">Username </label>
			<input
				type="text"
				id="username"
				placeholder="Enter Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
		</div>
	);
};

export default Login;
