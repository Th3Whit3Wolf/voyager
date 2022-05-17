import React, { useContext, useState } from "react";
import logo from "../../space-force-logo.png";
import { UserContext, ColorModeContext } from "#context";
import {
	Button,
	Link,
	AppBar,
	Box,
	Toolbar,
	useTheme,
	Container,
	Grid
} from "@mui/material";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
// Also need a small title shows USER or ADMIN

const Header = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { toggleColorMode } = useContext(ColorModeContext);
	const { user, setUser } = useContext(UserContext);

	const handleClick = () => {
		// Do some stuff
		setUser({});
		// navigate
		navigate("/");
	};

	return (
		<AppBar
			position="fixed"
			enableColorOnDark
			sx={{
				height: 100,
				display: "flex",
				padding: "5px 5px 5px 25px",
				flexGrow: 1,
				zIndex: thm => thm.zIndex.drawer + 1,
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
				<Grid container spacing={2} sx={{ p: "0 0.25rem" }}>
					<Grid xs={3} item></Grid>
					<Grid xs={6} item>
						{user?.assignedUnit && (
							<Box
								alt="Unit Patch"
								variant="img"
								src={
									import.meta.env.PROD
										? `https://dashboard.heroku.com/apps/bsdi1-voyager-backend${user.assignedUnit.img}`
										: `http://localhost:8081${user.assignedUnit.img}`
								}
							/>
						)}
					</Grid>
					<Grid xs={3} item>
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
							<Button
								variant="contained"
								sx={{
									backgroundColor: theme.palette.gsb.primary,
									mt: "0.75rem",
									ml: "1.75rem"
								}}
								onClick={toggleColorMode}
								data-testid="themeToggleButton"
							>
								{theme.palette.mode === "light" ? (
									<Brightness7Icon />
								) : (
									<Brightness2Icon />
								)}
							</Button>
							{Object.entries(user).length > 0 && (
								<Button
									variant="contained"
									onClick={handleClick}
									data-testid="logoutButton"
									sx={{
										backgroundColor: theme.palette.gsb.primary,
										mt: "0.75rem",
										ml: "1.75rem"
									}}
								>
									Logout
								</Button>
							)}
						</Container>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
