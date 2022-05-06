import React, { useState, useEffect, useContext, useMemo } from "react";

// Our Components and Hooks
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import useLogin from "../../hooks/useLogin";
import UserContext from "../../context/UserContext";
import Loading from "../../components/Loading/Loading";

import { UserAPI } from "../../services/api/UserAPI";
import { TaskAPI } from "../../services/api/TaskAPI";

// Third Party Components
import { TextField, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CatchingPokemonSharp } from "@mui/icons-material"; // WHATTTTTTT IS THIS ???? LOL.... Tony

const Login = () => {
	// STATE
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [splashOff, setSplashOff] = useState(false);

	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		console.log(user);
	}, [user]);

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
			setIsLoading(true);
			const userapi = new UserAPI();
			userapi
				.email(`${username}`)
				.get()
				.then(response => response.json())
				.then(d => setUser(d.data[0]))
				.catch(err => console.log(err))
				.then(() => navigate("/dashboard"))
				.finally(setIsLoading(false));
		}
	};

	const handleCAC = () => {
		alert(
			"Once auth is set up, fake this to essentially auto-login a default User. For MVP, no other features needed."
		);
	};

	//if (splashOff === false) return <SplashScreen />;

	if (isLoading) return <Loading />;

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
						setUsername("bridget.smitham@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate USER 68 (Bridget Smitham) Username and Password
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
