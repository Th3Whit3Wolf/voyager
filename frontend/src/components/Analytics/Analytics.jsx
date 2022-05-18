// Base Packages
import React, { useState, useEffect, useContext } from "react";

// Our Packages
import { Loading } from "#components";
import { BarChart, InfoCard, Report } from ".";

// Our Packages
import { UnitAPI } from "#services";
//import styles from "./Analytics.module.css";

import { styled } from "@mui/material/styles";
// Third Party Packages
import {
	Checkbox,
	FormGroup,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	useTheme,
	Paper,
	Toolbar
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
	const [analyticsState, setAnalyticsState] = useState({});

	// These pieces of State are used for various filtering routines
	const [totalUsersChecked, setTotalUsersChecked] = useState("true");
	const [squadronDropdown, setSquadronDropdown] = useState("");
	const [deltaDropdown, setDeltaDropdown] = useState("");

	const [basicChecked, setBasicChecked] = useState(true);
	const [inprocessingChecked, setInprocessingChecked] = useState(false);
	const [outprocessingChecked, setOutprocessingChecked] = useState(false);

	const calcAnalytics = analyticsObj => {
		let newAnalytics = { ...analyticsObj };
		let assigned = [];
		let gaining = [];
		let leaving = [];
		Object.entries(newAnalytics).forEach(([key, value]) => {
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
			.get(user.token)
			.then(response => response.json())
			.then(result => {
				if (result.data.length > 0) {
					setUnit(isSiteAdmin ? result.data : result.data[0]);
				}
			})
			.catch(error => console.log("error", error));
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
			analyticsInfo.own = {
				assigned: [],
				gaining: [],
				leaving: []
			};
			analyticsInfo.Commands = [];
			analyticsInfo.Deltas = [];
			analyticsInfo.Installations = [];
			analyticsInfo.Squadrons = [];
			//const unitKinds = ["t", "INSTALLATION", "COMMAND", "DELTA", "SQUADRON"];

			unit.forEach(u => {
				[
					["assigned", u.assignedUsers],
					["gaining", u.gainingUsers],
					["leaving", u.assignedUsers.filter(usr => usr.gainingUnitID !== null)]
				].forEach(([k, v]) => {
					analyticsInfo.total[k] = analyticsInfo.total[k].concat(v);
					analyticsInfo.own[k] = analyticsInfo.own[k].concat(v);
				});
			});

			setAnalyticsState(analyticsInfo);

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

	//  START FEATURE ENGINEERING

	//  END FEATURE ENGINEERING

	return (
		<>
			<Grid container spacing={8} sx={{ p: "0 2rem" }}>
				<Grid item xs={4}>
					{Object.entries(analyticsState).length === 0 && <Loading />}
					{Object.entries(analyticsState).length !== 0 && (
						<InfoCard
							title="Leaving"
							value={analyticsState?.total?.leaving?.length}
						/>
					)}
				</Grid>
				<Grid item xs={4}>
					{Object.entries(analyticsState).length === 0 && <Loading />}
					{Object.entries(analyticsState).length !== 0 && (
						<InfoCard
							title="Assigned"
							value={analyticsState?.total?.assigned?.length}
						/>
					)}
				</Grid>
				<Grid item xs={4}>
					{Object.entries(analyticsState).length === 0 && <Loading />}
					{Object.entries(analyticsState).length !== 0 && (
						<InfoCard
							title="Gaining"
							value={analyticsState?.total?.gaining?.length}
						/>
					)}
				</Grid>
			</Grid>

			<Toolbar />
			<>
				{Object.entries(analyticsState).length === 0 && <Loading />}
				{Object.entries(analyticsState).length > 0 && (
					<Report dataset={analyticsState} />
				)}
			</>
		</>
	);
};

export default Analytics;
