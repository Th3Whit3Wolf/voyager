import React, { useState, useContext } from "react";

// Our Components and Hooks
import { Loading } from "#components";
import { UserContext } from "#context";
import { UserAPI } from "#services/api";
import registrarAuth from "../../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

// Third Party Components
import {
	TextField,
	Button,
	Container,
	Stack,
	Box,
	Card,
	CardActions,
	Collapse
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";

const Login = () => {
	// STATE
	const [email, setEmail] = useState("johnny.bravo@spaceforce.mil");
	const [password, setPassword] = useState(
		"Get out of my chair and make me some coffee with eight sugars, then throw it out and make it again cause it's still not sweet enough!"
	);
	const [isLoading, setIsLoading] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	// Internal Functions
	const handleUserPass = e => {
		e.preventDefault();
		if (email == undefined || email.length === 0) {
			setEmail("");
			alert("Email Required");
		} else if (password == undefined || password.length === 0) {
			setPassword("");
			alert("Password Required");
		} else {
			setIsLoading(true);
			signInWithEmailAndPassword(registrarAuth, email, password)
				.then(userCredential => {
					// Signed in
					const userCred = userCredential.user;
					console.log({ userCred });
					userCred.getIdToken().then(token => {
						const userapi = new UserAPI();
						console.log({ token });
						userapi
							.email(`${email}`)
							.get(token)
							.then(response => response.json())
							.then(d => {
								let tempUser = d.data[0];
								if (tempUser === undefined) {
									alert(
										"Invalid Authentication Details. Try again or Contact your POC."
									);
									setEmail("");
									setPassword("");
								} else {
									tempUser.credentials = userCred;
									tempUser.token = token;
									setUser(tempUser);
									navigate("/dashboard");
								}
							})
							.catch(err => console.log(err))
							.finally(setIsLoading(false));
					});
					// ...
				})
				.catch(error => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log({ errorCode }, { errorMessage });
				});
		}
	};

	const handleCAC = () => {
		alert(
			"Once auth is set up, fake this to essentially auto-login a default User. For MVP, no other features needed."
		);
	};

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

				<Card
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						borderRadius: "2rem",
						marginTop: "20px"
					}}
				>
					<CardActions>
						<h3>For BDSI Demo Days: Quick Login Options</h3>
						<ExpandMore
							expand={`${expanded}`}
							onClick={() => setExpanded(!expanded)}
						></ExpandMore>
					</CardActions>
					<Collapse in={expanded}>
						<Button variant="contained" type="secondary">
							Squadron Admin
						</Button>
					</Collapse>
				</Card>
			</Container>
		</>
	);
};

export default Login;
