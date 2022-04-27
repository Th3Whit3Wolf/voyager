import React from "react";
import styles from "./Header.module.css";
import logo from "../../space-force-logo.png";

const Header = () => {
	return (
		<header className={styles.header__container}>
			<img src={logo} alt="Space Force Logo" />
			<h1>
				<span className={styles.header__title2}>Voyager</span>
			</h1>
		</header>
	);
};

export default Header;
