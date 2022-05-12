// Base Packages
import React from "react";

// Our Packages
import styles from "./Analytics.module.css";

// Third Party Packages
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const Analytics = () => {
	return (
		<section className={styles.container}>
			<nav className={styles.nav}>
				<h3>Navigation</h3>
			</nav>
			<section className={styles.sidebyside}>
				<sidebar className={styles.sidebar}>
					<h3>Sidebar</h3>
					<FormGroup>
						<FormControlLabel
							id="inprocessingTasksLabelID"
							control={<Checkbox />}
							label="Inprocessing Tasks"
						/>
					</FormGroup>
				</sidebar>
				<article className={styles.main}>
					<h3>Main Article</h3>
				</article>
			</section>
		</section>
	);
};

export default Analytics;
