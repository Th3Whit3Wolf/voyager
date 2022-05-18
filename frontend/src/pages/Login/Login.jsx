import React, { useState, useContext } from "react";

// Our Components and Hooks
import { Loading } from "#components";
import { PageContext, UserContext } from "#context";
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
import { ExpandMore, SecurityUpdateGood } from "@mui/icons-material";

const Login = () => {
	// STATE
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const { setPage } = useContext(PageContext);
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
					userCred.getIdToken().then(token => {
						const userapi = new UserAPI();
						console.log({ token });
						userapi
							.email(`${email}`)
							.get(token)
							.then(response => response.json())
							.then(d => {
								let tempUser = d.data[0];
								console.log(tempUser);
								if (tempUser === undefined) {
									alert(
										"Invalid Authentication Details. Try again or Contact your POC."
									);
									setEmail("");
									setPassword("");
								} else {
									tempUser.credentials = userCred;
									tempUser.token = token;
									if (tempUser && tempUser.role.kind === "USER") {
										setPage("Tasks");
									} else {
										setPage("Analytics");
									}
									setUser(tempUser);

									navigate("/dashboard");
								}
							})
							.catch(err => console.error(err));
					});
					// ...
				})
				.catch(error => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log({ errorCode }, { errorMessage });
				})
				.finally(setIsLoading(false));
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
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: "20px"
							}}
						>
							<Button
								variant="contained"
								color="secondary"
								sx={{ marginBottom: "8px" }}
								onClick={() => {
									setEmail("asuka.sohryu@spaceforce.mil");
									setPassword(
										"It is simply the duty of the elite to protect the ignorant masses."
									);
								}}
							>
								Inprocessing User
							</Button>
							<Button
								variant="contained"
								color="secondary"
								sx={{ marginBottom: "8px" }}
								onClick={() => {
									setEmail("shinji.ikari@spaceforce.mil");
									setPassword(
										"I still don’t know where to find happiness. But I’ll continue to think about whether it’s good to be here…whether it was good to have been born. But in the end, it’s just realizing the obvious over and over again. Because I am myself."
									);
								}}
							>
								Outprocessing User
							</Button>
							<Button
								variant="contained"
								color="success"
								sx={{ marginBottom: "8px" }}
								onClick={() => {
									setEmail("lelouch.lamperouge@spaceforce.mil");
									setPassword(
										"When there is evil in this world that justice cannot defeat, would you taint your hands with evil to defeat evil? Or would you remain steadfast and righteous even if it means surrendering to evil?"
									);
								}}
							>
								Squadron Admin
							</Button>
							<Button
								variant="contained"
								color="info"
								sx={{ marginBottom: "8px" }}
								onClick={() => {
									setEmail("johnny.bravo@spaceforce.mil");
									setPassword(
										"Get out of my chair and make me some coffee with eight sugars, then throw it out and make it again cause it's still not sweet enough!"
									);
								}}
							>
								Installation Admin
							</Button>
							{/* <Button
								variant="contained"
								color="warning"
								sx={{ marginBottom: "8px" }}
							>
								Delta Admin
							</Button> */}
							<Button
								variant="contained"
								color="error"
								sx={{ marginBottom: "8px" }}
								onClick={() => {
									setEmail("sterling.archer@spaceforce.mil");
									setPassword(
										"No, forget the glass Woodhouse, just give me the pitcher. For I am a sinner in the hands of an angry God. Bloody Mary, full of vodka, blessed are you among cocktails. Pray for me now and at the hour of my death, which I hope is soon. Amen."
									);
								}}
							>
								Command Admin
							</Button>
							<Button
								variant="contained"
								color="inherit"
								sx={{ marginBottom: "8px" }}
								onClick={() => {
									setEmail("rick.sanchez@spaceforce.mil");
									setPassword("Wubba Lubba Dub Dub");
								}}
							>
								Site Admin
							</Button>
						</Box>
					</Collapse>
				</Card>
			</Container>
		</>
	);
};

export default Login;
