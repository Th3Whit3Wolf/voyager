// Base Packages
import React, { useState, useEffect, useContext } from "react";

// Our Packages
import { UserContext } from "#context";
import styles from "./Analytics.module.css";

// Third Party Packages
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const Analytics = ({ user }) => {
	console.log("Admin User", user);
	console.log("Admin Tasks Assigned", user?.tasksAssigned);
	console.log(
		user?.tasksAssigned?.filter(task => task.kind === "IN_PROCESSING")
	);

	const [basicChecked, setBasicChecked] = useState(true);
	const [inprocessingChecked, setInprocessingChecked] = useState(false);
	const [outprocessingChecked, setOutprocessingChecked] = useState(false);

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
							control={
								<Checkbox
									value={basicChecked}
									onChange={() => setBasicChecked(!basicChecked)}
									checked={basicChecked ? "checked" : ""}
								/>
							}
							label="Basic"
						/>
						<FormControlLabel
							id="inprocessingTasksLabelID"
							control={
								<Checkbox
									onChange={() => setInprocessingChecked(!inprocessingChecked)}
									checked={inprocessingChecked ? "checked" : ""}
								/>
							}
							label="Inprocessing Tasks"
						/>
						<FormControlLabel
							id="outprocessingTasksLabelID"
							control={
								<Checkbox
									onChange={() =>
										setOutprocessingChecked(!outprocessingChecked)
									}
									checked={outprocessingChecked ? "checked" : ""}
								/>
							}
							label="Outprocessing Tasks"
						/>
					</FormGroup>
				</sidebar>
				<article className={styles.main}>
					<h3>Main Article</h3>
					{basicChecked && (
						<div>
							<h2>Show Basic Plots</h2>
						</div>
					)}
					{inprocessingChecked && (
						<div>
							<h2>Show Inprocessing Plots</h2>
						</div>
					)}
					{outprocessingChecked && (
						<div>
							<h2>Show Outprocessing Plots</h2>
						</div>
					)}
				</article>
			</section>
		</section>
	);
};

export default Analytics;
