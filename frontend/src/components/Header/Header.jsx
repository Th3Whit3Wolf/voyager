import React from "react";
import styles from "./Header.module.css";
import logo from "../../space-force-logo.png";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Also need a small title shows USER or ADMIN

const Header = () => {
	const navigate = useNavigate();
	return (
		<header className={styles.header__container}>
			<img src={logo} alt="Space Force Logo" />
			<h1>
				<span className={styles.header__title2}>Voyager</span>
			</h1>
			<Grid className={styles.header__button}>
				<Button variant="contained" onClick={() => navigate("/")}>
					Logout
				</Button>
			</Grid>
		</header>
	);
};

export default Header;
