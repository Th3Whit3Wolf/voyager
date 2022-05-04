import React, { useState, useEffect, useContext } from "react";

// Our Components and Hooks
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import useLogin from "../../hooks/useLogin";
import UserContext from "../../context/UserContext";

// Third Party Components
import { TextField, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
	// STATE
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [splashOff, setSplashOff] = useState(false);

	const context = useContext(UserContext);

	const navigate = useNavigate();

	// EFFECTS

	useEffect(() => {
		setTimeout(() => {
			setSplashOff(true);
		}, 4500);
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
			fetch("http://localhost:8081/api/v1/users")
				.then(response => response.json())
				.then(userList => userList.filter(user => user.email === username)[0])
				.then(user => {
					if (user.id === 1) context.role = "user";
					if (user.id === 66) context.role = "admin";
					context.user = user;
				})
				.then(() => navigate("/dashboard"));
		}
	};

	const handleCAC = () => {
		alert(
			"Once auth is set up, fake this to essentially auto-login a default User. For MVP, no other features needed."
		);
	};

	//if (splashOff === false) return <SplashScreen />;

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
						label="Email"
						variant="standard"
						placeholder="Enter Email"
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
				<Button
					color="secondary"
					variant="contained"
					onClick={() => {
						setUsername("rick.sanchez@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate USER 1 (Rick Sanchez) Username and Password
				</Button>

				<br />

				<Button
					color="warning"
					variant="contained"
					onClick={() => {
						setUsername("morris.hirthe@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate ADMIN 66 (Morris Hirthe) Username and Password
				</Button>
			</Stack>
		</>
	);
};

export default Login;
