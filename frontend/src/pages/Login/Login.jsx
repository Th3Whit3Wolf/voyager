import React, { useState, useEffect, useContext, useMemo } from "react";

// Our Components and Hooks
import { SplashScreen, Loading } from "#components";
import { UserContext } from "#context";

import { UserAPI } from "#services/api";

// Third Party Components
import { TextField, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CatchingPokemonSharp } from "@mui/icons-material"; // WHATTTTTTT IS THIS ???? LOL.... Tony // But also why? David

const Login = () => {
	// STATE
	const [email, setEmail] = useState("johnny.bravo@spaceforce.mil");
	const [password, setPassword] = useState("123456789");
	const [isLoading, setIsLoading] = useState(false);

	const [splashOff, setSplashOff] = useState(false);

	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	// EFFECTS

	useEffect(() => {
		setTimeout(() => {
			setSplashOff(true);
		}, 4500);
	});

	// Internal Functions
	const handleUserPass = () => {
		if (email == undefined || email.length === 0) {
			setEmail("");
			alert("Email Required");
		} else if (password == undefined || password.length === 0) {
			setPassword("");
			alert("Password Required");
		} else {
			setIsLoading(true);
			const userapi = new UserAPI();
			userapi
				.email(`${email}`)
				.get()
				.then(response => response.json())
				.then(d => {
					let tempUser = d.data[0];
					setUser(tempUser);
					if (tempUser === undefined) {
						alert(
							"Invalid Authentication Details. Try again or Contact your POC."
						);
						setEmail("");
						setPassword("");
					} else {
						navigate("/dashboard");
					}
				})
				.catch(err => console.log(err))
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
					mt={5}
					spacing={1}
					pb={5}
					pt={1}
					border={2}
					lineHeight={1}
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
						value={email}
						onChange={e => setEmail(e.target.value)}
						sx={{ minWidth: "340px", pb: 2 }}
					/>
					<TextField
						id="password"
						label="Password"
						variant="standard"
						placeholder="Enter Password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						sx={{ minWidth: "340px", pb: 4 }}
					/>
					<Button
						variant="contained"
						onClick={handleUserPass}
						sx={{ minWidth: "210px" }}
					>
						Email/Password Login
					</Button>
					<br />
					<br />
					<Button
						variant="contained"
						onClick={handleCAC}
						sx={{ minWidth: "210px" }}
					>
						CAC/ECA Login
					</Button>
				</Stack>
			</Container>

			<Stack
				pt={5}
				mt={3}
				spacing={2}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					alignSelf: "center"
				}}
			>
				<Button
					color="error"
					variant="contained"
					onClick={() => {
						setEmail("bridget.smitham@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate USER XX (Bridget Smitham) --- AN INVALID USER
				</Button>

				<br />

				<Button
					color="secondary"
					variant="contained"
					onClick={() => {
						setEmail("raquel.orn@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate USER 67 (Raquel Orn) --- InProcessing
				</Button>

				<br />

				<Button
					color="secondary"
					variant="contained"
					onClick={() => {
						setEmail("sherri.ortiz@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate USER 68 (Sherry Ortiz) --- OutProcessing
				</Button>

				<br />

				<Button
					color="warning"
					variant="contained"
					onClick={() => {
						setEmail("johnny.bravo@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate ADMIN 66 (Johnny Bravo) -- Installation Admin
				</Button>

				<br />

				<Button
					color="warning"
					variant="contained"
					onClick={() => {
						setEmail("lynette.bogan@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate ADMIN 1104 (Lynette Bogan) -- Delta Admin
				</Button>

				<br />

				<Button
					color="warning"
					variant="contained"
					onClick={() => {
						setEmail("sterling.archer@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate ADMIN 2 (Sterling Archer) -- Command Admin
				</Button>

				<br />

				<Button
					color="warning"
					variant="contained"
					onClick={() => {
						setEmail("rick.sanchez@spaceforce.mil");
						setPassword("123456789");
					}}
				>
					Click to Auto Populate ADMIN 1 (Rick Sanchez) -- Site Admin
				</Button>
			</Stack>
		</>
	);
};

export default Login;
