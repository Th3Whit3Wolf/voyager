// Base Packages
import React, { useState, useEffect, useContext } from "react";

// Our Packages
import { BarChart, InfoCard } from ".";

// Our Packages
import { UserContext } from "#context";
import { UnitAPI } from "#services";
import styles from "./Analytics.module.css";

// Third Party Packages
import {
	Checkbox,
	FormGroup,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	useTheme
} from "@mui/material";

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

///////////////////// ANALYTICS HOOK BEGINS HERE /////////////////////////

const Analytics = ({ user }) => {
	// The unit State object from database
	// the analyticsState object which conducts feature engineering
	//    You will almost always be using the analyticsState to reference
	//    for simple data heuristics
	const theme = useTheme();
	const [unit, setUnit] = useState({});
	const [allUsers, setAllUsers] = useState([]);
	const [analyticsState, setAnalyticsState] = useState({});

	// These pieces of State are used for various filtering routines
	const [totalUsersChecked, setTotalUsersChecked] = useState("true");
	const [squadronDropdown, setSquadronDropdown] = useState("");
	const [deltaDropdown, setDeltaDropdown] = useState("");

	const [basicChecked, setBasicChecked] = useState(true);
	const [inprocessingChecked, setInprocessingChecked] = useState(false);
	const [outprocessingChecked, setOutprocessingChecked] = useState(false);

	// These pieces of State are used for feature engineering
	// totalUserIDs -> gathers all the unitIDs into one state array
	//     the idea is this changes based on whether Total, Squadron, or Delta is selected
	// fetchedTotalUserIDs -> don't want to do the whole promise chain on totalUserIDs with
	//     every re-render! The idea is to do it once, then use this as a flag to stop if
	//     from happening again. You can probably use the analyticState's leaving, gaining,
	//     assiging to re-filter off of totalUserData when any filters are changed
	//  totalUserData -> fetch all the user data once, then hold it here
	const [totalUserIDs, setTotalUserIDs] = useState([]);
	const [fetchedTotalUserIDs, setFetchedTotalUserIDs] = useState(false);

	const calcAnalytics = analyticsObj => {
		let newAnalytics = { ...analyticsObj };
		let assigned = [];
		let gaining = [];
		let leaving = [];
		Object.entries(newAnalytics).forEach(([key, value]) => {
			// console.log(
			// 	"INFO::calcAnalytics (key):",
			// 	key,
			// 	"INFO::calcAnalytics (value):",
			// 	value
			// );
			if (key === "own") {
				assigned = [...assigned, ...value.assigned];
				gaining = [...gaining, ...value.gaining];
				leaving = [...leaving, ...value.leaving];
			} else {
				value.forEach(v => {
					assigned = [...assigned, ...v.assigned];
					gaining = [...gaining, ...v.gaining];
					leaving = [...leaving, ...v.leaving];
				});
			}
		});
		newAnalytics.total = {
			assigned,
			gaining,
			leaving
		};
		setAnalyticsState(newAnalytics);
		console.log("Current analytics state:", analyticsState);
	};

	// on component load set load up the state
	useEffect(() => {
		let isSiteAdmin = user.role.kind === "SITE_ADMIN";
		const unitData = isSiteAdmin
			? new UnitAPI()
			: new UnitAPI().id(user.assignedUnit.id);
		if (isSiteAdmin) {
			unitData.limit(200);
		}
		unitData
			.get()
			.then(response => response.json())
			.then(result => {
				if (result.data.length > 0) {
					setUnit(isSiteAdmin ? result.data : result.data[0]);
				}
			})
			.catch(error => console.log("error", error));

		// GRAB ALL USERS
		// var requestOptions = {
		// 	method: "GET",
		// 	redirect: "follow"
		// };

		// fetch("http://localhost:8081/api/v1/users", requestOptions)
		// 	.then(response => response.json())
		// 	.then(result => setAllUsers(result))
		// 	.catch(error => console.log("error", error));
	}, []);

	// After UNIT is populated from the above useEffect, then build out
	//   the analyticsState object
	useEffect(() => {
		const analyticsInfo = {};
		if (user.role.kind === "SITE_ADMIN" && unit.length > 0) {
			const types = [
				"total",
				"Installations",
				"Commands",
				"Deltas",
				"Squadrons"
			];
			analyticsInfo.total = {
				assigned: [],
				gaining: [],
				leaving: []
			};
			analyticsInfo.Commands = [];
			analyticsInfo.Deltas = [];
			analyticsInfo.Installations = [];
			analyticsInfo.Squadrons = [];
			const unitKinds = ["t", "INSTALLATION", "COMMAND", "DELTA", "SQUADRON"];

			unit.forEach(u => {
				[
					["assigned", u.assignedUsers],
					["gaining", u.gainingUsers],
					["leaving", u.assignedUsers.filter(usr => usr.gainingUnitID !== null)]
				].forEach(([k, v]) => {
					analyticsInfo.total[k] = analyticsInfo.total[k].concat(v);
				});
			});

			setAnalyticsState(analyticsInfo);
			console.log("Current analytics state:", analyticsState);

			return;
		} else if (Object.entries(unit).length > 0) {
			let {
				gainingUsers: gaining,
				assignedUsers: assigned,
				name,
				img,
				children,
				grandChildren,
				installationChildren
			} = unit;

			console.log("Role = ", user.role.kind);
			switch (user.role.kind) {
				case "INSTALLATION_ADMIN":
					analyticsInfo.own = {
						name,
						img,
						assigned,
						gaining,
						leaving: assigned.filter(usr => usr.gainingUnitID !== null)
					};
					updateAnalytics("Squadrons", installationChildren, analyticsInfo);
					calcAnalytics(analyticsInfo);
					console.log("Analytics state:", analyticsState);
					return;
				case "COMMAND_ADMIN":
					analyticsInfo.own = {
						name,
						img,
						assigned,
						gaining,
						leaving: assigned.filter(usr => usr.gainingUnitID !== null)
					};
					updateAnalytics("Deltas", children, analyticsInfo);
					updateAnalytics("Squadrons", grandChildren, analyticsInfo);
					calcAnalytics(analyticsInfo);
					return;
				case "DELTA_ADMIN":
					analyticsInfo.own = {
						name,
						img,
						assigned,
						gaining,
						leaving: assigned.filter(usr => usr.gainingUnitID !== null)
					};
					updateAnalytics("Squadrons", children, analyticsInfo);
					calcAnalytics(analyticsInfo);
					return;
				case "SQUADRON_ADMIN":
					analyticsInfo.own = {
						assigned,
						gaining,
						leaving: assigned.filter(usr => usr.gainingUnitID !== null)
					};
					calcAnalytics(analyticsInfo);
					return;
				default:
					return;
			}
		}

		console.log("State", analyticsState);
	}, [unit]);

	// START OF FILTERING FUNCTIONS

	useEffect(() => {
		if (totalUsersChecked === true) setSquadronDropdown("");
		if (totalUsersChecked === true) setDeltaDropdown("");
	}, [totalUsersChecked]);

	useEffect(() => {
		if (totalUsersChecked === false && deltaDropdown !== "")
			setDeltaDropdown("");
		if (totalUsersChecked === false && squadronDropdown !== "")
			setSquadronDropdown("");
	}, [squadronDropdown, deltaDropdown]);

	// END OF FILTERING FUNCTIONS

	const data = [
		{
			name: "Total",
			"In Processing": user?.tasksAssigned?.filter(
				task => task?.kind === "IN_PROCESSING"
			).length,
			"Out Processing": user?.tasksAssigned?.filter(
				task => task?.kind === "OUT_PROCESSING"
			).length
		},
		{
			x: "Total Active",
			name: "Total ",
			"In Processing": user?.tasksAssigned
				?.filter(task => task?.kind === "IN_PROCESSING")
				?.filter(task => task?.isActive === true).length,
			"Out Processing": user?.tasksAssigned
				?.filter(task => task?.kind === "OUT_PROCESSING")
				?.filter(task => task?.isActive === true).length
		}
	];

	const barInfo = [
		{
			dataKey: "In Processing",
			fill: theme.palette.success[theme.palette.mode]
		},
		{
			dataKey: "Out Processing",
			fill: theme.palette.warning[theme.palette.mode]
		}
	];

	const datasets = { data, barInfo };

	//  START FEATURE ENGINEERING
	useEffect(() => {
		console.log(analyticsState.total);
		if (analyticsState.total) {
			setTotalUserIDs([
				...analyticsState.total.assigned.map(person => person.id),
				...analyticsState.total.gaining.map(person => person.id),
				...analyticsState.total.leaving.map(person => person.id)
			]);
		}
	}, [analyticsState?.total]);

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		if (totalUserIDs.length > 0 && fetchedTotalUserIDs === false) {
			setFetchedTotalUserIDs(true);
			console.log("totalusers ", totalUserIDs);
			console.log("fetchedTotalUserIDs ", fetchedTotalUserIDs);

			const promises = totalUserIDs.map(prom => {
				return fetch(
					`http://localhost:8081/api/v1/users/${prom}`,
					requestOptions
				);
			});

			Promise.all(promises)
				.then(responses =>
					Promise.all(responses.map(response => response.json()))
				)
				.then(results => results.map(result => result.data))
				.then(hugeArray => setTotalUserData(hugeArray))
				.catch(error => console.log("error", error));
		}
	}, [totalUserIDs]);

	//  END FEATURE ENGINEERING

	return (
		<section className={styles.container}>
			<nav className={styles.nav}>
				<section className={styles.snapshot}>
					<InfoCard
						title="Leaving"
						value={analyticsState?.total?.leaving?.length}
					/>
					<InfoCard
						title="Assigned"
						value={analyticsState?.total?.assigned?.length}
					/>
					<InfoCard
						title="Gaining"
						value={analyticsState?.total?.gaining?.length}
					/>
				</section>
			</nav>
			<section className={styles.sidebyside}>
				<sidebar className={styles.sidebar}>
					<h2>Unit Filters</h2>

					<FormGroup>
						<FormControlLabel
							id="totalUsers"
							control={
								<Checkbox
									value={totalUsersChecked}
									onChange={() => setTotalUsersChecked(!totalUsersChecked)}
									checked={totalUsersChecked ? "checked" : ""}
								/>
							}
							label={<h3>Analytics for Total Users</h3>}
						/>

						{analyticsState.Deltas !== undefined && (
							<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="delta-dropdown-filter-label">
									Uncheck to Select a Delta
								</InputLabel>
								<Select
									labelId="delta-dropdown-filter-label"
									id="del-dropdown-filter"
									value={deltaDropdown}
									onChange={e => setDeltaDropdown(e.target.value)}
									label="deltDropdownFilter"
									disabled={totalUsersChecked}
								>
									{analyticsState.Deltas.map((delta, idx) => (
										<MenuItem key={idx} value={delta.name}>
											{delta.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}

						{analyticsState.Squadrons !== undefined && (
							<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="squadron-dropdown-filter-label">
									Uncheck to Select a Squadron
								</InputLabel>
								<Select
									labelId="squadron-dropdown-filter-label"
									id="squadron-dropdown-filter"
									value={squadronDropdown}
									onChange={e => {
										console.log("Changing Squadron Filter ", e.target.value);
										setSquadronDropdown(e.target.value);
									}}
									label="squadronDropdownFilter"
									disabled={totalUsersChecked}
								>
									{analyticsState.Squadrons.map((squadron, idx) => (
										<MenuItem key={idx} value={squadron.name}>
											{squadron.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}

						<h2>Likely Defunct Filters</h2>

						<FormControlLabel
							id="inprocessingTasksLabelID"
							control={
								<Checkbox
									value={basicChecked}
									onChange={() => setBasicChecked(!basicChecked)}
									checked={basicChecked ? "checked" : ""}
								/>
							}
							label="Default Basic"
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
					<section>
						{basicChecked && <hr />}

						{basicChecked && (
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									flexWrap: "wrap"
								}}
							>
								<BarChart datasets={datasets} />
								<BarChart datasets={datasets} />
								<InfoCard title={"Placeholder"} />
								<InfoCard title={"Placeholder"} />
							</div>
						)}
					</section>

					<section>
						{inprocessingChecked && <hr />}

						{inprocessingChecked && (
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									flexWrap: "wrap"
								}}
							>
								<InfoCard title={"Placeholder"} />
								<InfoCard title={"Placeholder"} />
							</div>
						)}
					</section>

					<section>
						{outprocessingChecked && (
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									flexWrap: "wrap"
								}}
							>
								<InfoCard title={"Placeholder"} />
								<InfoCard title={"Placeholder"} />
								<h2>Show Outprocessing Plots</h2>
							</div>
						)}
					</section>
				</article>
			</section>
			<article
				style={{
					backgroundColor: "rgb(61, 82, 101)",
					marginTop: "2rem",
					borderRadius: "1rem",
					color: "white"
				}}
			>
				<h3 style={{ textAlign: "center" }}>Report</h3>
			</article>
		</section>
	);
};

export default Analytics;
