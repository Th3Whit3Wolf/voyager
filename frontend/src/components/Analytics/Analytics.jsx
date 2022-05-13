// Base Packages
import React, { useState, useEffect, useContext } from "react";

// Our Packages
import { BarChart } from ".";

// Our Packages
import { UserContext } from "#context";
import { UnitAPI } from "#services";
import styles from "./Analytics.module.css";

// Third Party Packages
import { Checkbox, FormGroup, FormControlLabel, Card } from "@mui/material";
import {
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	VerticalBarSeries,
	DiscreteColorLegend
} from "react-vis";

function FindAllMethods(obj) {
	return Object.getOwnPropertyNames(obj).filter(function (property) {
		return typeof obj[property] == "function";
	});
}

const updateAnalytics = (displayName, arr, analyticsObj) => {
	return (analyticsObj[displayName] = arr.map(old => {
		let newData = {
			...old,
			gaining: old.gainingUsers,
			assigned: old.assignedUsers
		};
		newData.leaving = newData.assigned.filter(
			usr => usr.gainingUnitID !== null
		);
		return newData;
	}));
};

const Analytics = ({ user }) => {
	const [basicChecked, setBasicChecked] = useState(true);
	const [inprocessingChecked, setInprocessingChecked] = useState(false);
	const [outprocessingChecked, setOutprocessingChecked] = useState(false);

	const [unit, setUnit] = useState({});
	const [analyticsState, setAnalyticsState] = useState({});

	// on component load set load up the state
	useEffect(() => {
		const unitData =
			user.role.kind === "SITE_ADMIN"
				? new UnitAPI()
				: new UnitAPI().id(user.assignedUnit.id);
		unitData
			.get()
			.then(response => response.json())
			.then(result => {
				if (result.data.length > 0) {
					setUnit(result.data[0]);
				}
			})
			.catch(error => console.log("error", error));
	}, []);

	useEffect(() => {
		const analyticsInfo = {};

		if (Object.entries(unit).length > 0) {
			console.log("Object has entries", unit);
			if (user.role.kind === "SITE_ADMIN") {
			} else {
				let {
					gainingUsers: gaining,
					assignedUsers: assigned,
					children,
					grandChildren,
					installationChildren
				} = unit;

				console.log("Role = ", user.role.kind);
				switch (user.role.kind) {
					case "INSTALLATION_ADMIN":
						analyticsInfo.own = {
							assigned,
							gaining,
							leaving: assigned.filter(usr => usr.gainingUnitID !== null)
						};
						updateAnalytics("Squadrons", installationChildren, analyticsInfo);
						setAnalyticsState(analyticsInfo);
						console.log(analyticsInfo);
						return;
					case "COMMAND_ADMIN":
						analyticsInfo.own = {
							assigned,
							gaining,
							leaving: assigned.filter(usr => usr.gainingUnitID !== null)
						};
						updateAnalytics("Deltas", children, analyticsInfo);
						updateAnalytics("Squadrons", grandChildren, analyticsInfo);
						setAnalyticsState(analyticsInfo);
						return;
					case "DELTA_ADMIN":
						analyticsInfo.own = {
							assigned,
							gaining,
							leaving: assigned.filter(usr => usr.gainingUnitID !== null)
						};
						updateAnalytics("Squadrons", children, analyticsInfo);
						setAnalyticsState(analyticsInfo);
						return;
					case "SQUADRON_ADMIN":
						analyticsInfo.own = {
							assigned,
							gaining,
							leaving: assigned.filter(usr => usr.gainingUnitID !== null)
						};
						setAnalyticsState(analyticsInfo);
						return;
					default:
						return;
				}
			}
		}

		console.log("State", analyticsState);
	}, [unit]);

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

	const datasets = [greenData, blueData];

	return (
		<section className={styles.container}>
			<nav className={styles.nav}>
				{/* <h1 style={{ fontSize: "2rem" }}>Analytics</h1> */}
				<section className={styles.snapshot}>
					<Card
						sx={{
							backgroundColor: "#000000",
							padding: "10px",
							borderRadius: "5px"
						}}
					>
						Leaving
						<br />
						{analyticsState?.own?.leaving?.length}
					</Card>
					<Card
						sx={{
							backgroundColor: "#000000",
							padding: "10px",
							borderRadius: "5px"
						}}
					>
						Assigned
						<br />
						{analyticsState?.own?.assigned?.length}
					</Card>
					<Card
						sx={{
							backgroundColor: "#000000",
							padding: "10px",
							borderRadius: "5px"
						}}
					>
						Gaining
						<br />
						{analyticsState?.own?.gaining?.length}
					</Card>
				</section>
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
					<section>
						<h2>Show Basic Plots</h2>
						{basicChecked && (
							<div className={styles.showPlots}>
								<BarChart datasets={datasets} />
								<BarChart datasets={datasets} />
							</div>
						)}
					</section>

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
