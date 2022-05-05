import React, { useContext } from "react";
import styles from "./Header.module.css";
import logo from "../../space-force-logo.png";
import { UserContext } from "../../context";

import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Also need a small title shows USER or ADMIN

const Header = () => {
	const navigate = useNavigate();
	const context = useContext(UserContext);

	const handleClick = () => {
		// Do some stuff
		context.user = {};
		// navigate
		navigate("/");
	};

	return (
		<header className={styles.header__container}>
			<a
				href="https://voyager.jpl.nasa.gov/mission/status/" // <- love it
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={logo} alt="Space Force Logo" />
			</a>
			<div>
				<h1 style={context?.user?.role && { marginBottom: "-20px" }}>
					<span className={styles.header__title2}>Voyager</span>
				</h1>
				{context?.user?.role && <h4>{context.user.role.kind} VIEW</h4>}
			</div>

			<Grid
				className={styles.header__button}
				sx={{
					display: "flex",
					flexGrow: 1,
					justifyContent: "flex-end"
				}}
			>
				{context?.user?.firstName ? (
					<div className={styles.header__title3}>
						<p style={{ marginRight: "2rem" }}>
							Welcome, {context.user.firstName}!
						</p>{" "}
						<Button variant="contained" onClick={handleClick}>
							Logout
						</Button>
					</div>
				) : null}
			</Grid>
		</header>
	);
};

export default Header;
