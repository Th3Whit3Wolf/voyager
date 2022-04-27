import React from "react";
import styles from "./Header.module.css";
import logo from "../../space-force-logo.png";
import { Button } from "@mui/material";
// Also need a small title shows USER or ADMIN

const Header = () => {
	return (
		<header className={styles.header__container}>
			<img src={logo} alt="Space Force Logo" />
			<h1>
				<span className={styles.header__title2}>Voyager</span>
			</h1>
			<Button variant="contained">Logout</Button>
		</header>
	);
};

export default Header;
