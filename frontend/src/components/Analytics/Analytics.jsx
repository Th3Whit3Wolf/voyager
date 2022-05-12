// Base Packages
import React, { useState, useEffect, useContext } from "react";

// Our Packages
import { UserContext } from "#context";
import styles from "./Analytics.module.css";

// Third Party Packages
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import {
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	VerticalBarSeries,
	DiscreteColorLegend
} from "react-vis";

const Analytics = ({ user }) => {
	console.log("Admin User", user);
	console.log("Admin Tasks Assigned", user?.tasksAssigned);

	const [basicChecked, setBasicChecked] = useState(true);
	const [inprocessingChecked, setInprocessingChecked] = useState(false);
	const [outprocessingChecked, setOutprocessingChecked] = useState(false);

	const total_in = user?.tasksAssigned?.filter(
		task => task?.kind === "IN_PROCESSING"
	);

	const total_in_active = user?.tasksAssigned
		?.filter(task => task?.kind === "IN_PROCESSING")
		?.filter(task => task?.isActive === true);

	const total_out = user?.tasksAssigned?.filter(
		task => task?.kind === "OUT_PROCESSING"
	);

	const total_out_active = user?.tasksAssigned
		?.filter(task => task?.kind === "OUT_PROCESSING")
		?.filter(task => task?.isActive === true);

	//console.log(total_in);
	//console.log(total_out);

	const greenData = [
		{
			x: "Total",
			y: total_in.length
		},
		{
			x: "Total Active",
			y: total_in_active.length
		}
	];

	const blueData = [
		{
			x: "Total",
			y: total_out.length
		},
		{
			x: "Total Active",
			y: total_out_active.length
		}
	];

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
							<XYPlot xType="ordinal" width={600} height={500} xDistance={10}>
								<VerticalGridLines />
								<HorizontalGridLines />
								<XAxis style={{ fontSize: "1.1em" }} />
								<YAxis style={{ fontSize: "1.05em" }} />
								<VerticalBarSeries data={greenData} />
								<VerticalBarSeries data={blueData} />
								<DiscreteColorLegend
									style={{
										backgroundColor: "white"
									}}
									width={180}
									items={[{ title: "Inprocessing" }, "Outprocessing"]}
								/>
							</XYPlot>
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
