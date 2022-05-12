// Base Packages
import React, { useState, useEffect, useContext } from "react";

// Our Packages
import { UserContext } from "#context";
import styles from "./Analytics.module.css";

// Third Party Packages
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const Analytics = ({ user }) => {
	console.log(user);
	console.log(user?.tasksAssigned);
	console.log(
		user?.tasksAssigned?.filter(task => task.kind === "IN_PROCESSING")
	);

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
							label="Basic"
						/>
						<FormControlLabel
							id="inprocessingTasksLabelID"
							control={<Checkbox />}
							label="Inprocessing Tasks"
						/>
						<FormControlLabel
							id="outprocessingTasksLabelID"
							control={<Checkbox />}
							label="Outprocessing Tasks"
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
