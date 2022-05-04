import React, { useContext } from "react";
import styles from "./Header.module.css";
import logo from "../../space-force-logo.png";
import UserContext from "../../context/UserContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Also need a small title shows USER or ADMIN

const Header = () => {
	const navigate = useNavigate();
	const context = useContext(UserContext);

	const handleClick = () => {
		// Do some stuff
		// :-D
		// navigate
		navigate("/");
	};

	return (
		<header className={styles.header__container}>
			<a
				href="https://voyager.jpl.nasa.gov/mission/status/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={logo} alt="Space Force Logo" />
			</a>
			<h1>
				<span className={styles.header__title2}>Voyager</span>
			</h1>
			<Grid
				className={styles.header__button}
				sx={{
					display: "flex",
					flexGrow: 1,
					justifyContent: "flex-end"
				}}
			>
				{context.role ? (
					<div className={styles.header__title3}>
						Logged in as {context.role}
						<Button variant="contained" marginLeft="10px" onClick={handleClick}>
							Logout
						</Button>
					</div>
				) : null}
			</Grid>
		</header>
	);
};

export default Header;
