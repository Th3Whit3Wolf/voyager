import React, { useContext } from "react";
import logo from "../../space-force-logo.png";
import { UserContext } from "#context";

import {
	Button,
	Link,
	AppBar,
	Box,
	Toolbar,
	Typography,
	useTheme,
	Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// Also need a small title shows USER or ADMIN

const NewHeader = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

	console.log("THEME:", theme);

	const handleClick = () => {
		// Do some stuff
		setUser({});
		// navigate
		navigate("/");
	};

	return (
		<AppBar
			position="static"
			enableColorOnDark
			sx={{
				height: 100,
				display: "flex",
				padding: "5px 5px 5px 25px",
				flexGrow: 1,
				backgroundColor: theme.palette.gsb.background
			}}
		>
			<Toolbar disableGutters>
				<Link
					href="https://voyager.jpl.nasa.gov/mission/status/"
					underline="none"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Box
						disableGutters
						component="img"
						sx={{
							p: 0,
							m: 0,
							height: 80,
							width: 70,
							mr: "15px"
						}}
						src={logo}
						alt="Space Force Logo"
					/>
				</Link>

				<Container disableGutters>
					<h1
						style={{
							color: theme.palette.gsb.text,
							marginBottom: user?.role ? -20 : 0
						}}
					>
						<span style={{ color: theme.palette.gsb.text }}>Voyager</span>
					</h1>

					{user?.role && (
						<h6 style={{ color: theme.palette.gsb.primary }}>
							{user.role.kind.replace("_", " ")} VIEW
						</h6>
					)}
				</Container>

				<Box
					sx={{
						display: "flex",
						flexGrow: 1,
						justifyContent: "flex-end"
					}}
				>
					{user?.firstName ? (
						<Container
							disableGutters
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								color: theme.palette.gsb.text,
								pr: "5%",
								alignItems: "center"
							}}
						>
							<Typography variant="p" sx={{ mr: "2rem" }}>
								Welcome, {user.firstName}!
							</Typography>
							<Button
								variant="contained"
								onClick={handleClick}
								data-testid="logoutButton"
								sx={{
									backgroundColor: theme.palette.gsb.primary,
									mr: "0.75rem"
								}}
							>
								Logout
							</Button>
						</Container>
					) : (
						""
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NewHeader;
