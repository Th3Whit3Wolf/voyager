import React, { useState, useEffect, useContext, useMemo } from "react";

// Our Components and Hooks
import { Loading } from "#components";
import { UserContext } from "#context";
import { UserAPI } from "#services/api";
import registrarAuth from "../../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

// Third Party Components
import { TextField, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
	// STATE
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
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
			</Container>
		</>
	);
};

export default Login;
