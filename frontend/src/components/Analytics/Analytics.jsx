// Base Packages
import React from "react";

// Our Packages
import styles from "./Analytics.module.css";

// Third Party Packages

const Analytics = () => {
	return (
		<section className={styles.container}>
			<nav className={styles.nav}>
				<h3>Navigation</h3>
			</nav>
			<section className={styles.sidebyside}>
				<sidebar className={styles.sidebar}>
					<h3>Sidebar</h3>
				</sidebar>
				<article>
					<h3>Main Article</h3>
				</article>
			</section>
		</section>
	);
};

export default Analytics;
