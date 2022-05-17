// Base Package
import React, { useState, useEffect, useContext } from "react";

// Our Packages
import { Loading } from "#components";
import { UserContext } from "#context";
//import styles from "./ChartTypes.module.css";

// Third Party
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";

import {
	Container,
	Paper,
	CssBaseline,
	Toolbar,
	useTheme,
	Grid,
	List,
	ListItemText,
	ListSubheader,
	ListItemButton,
	Collapse,
	ListItemIcon,
	Divider
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
const ReportList = ({ title, dataObj, theme }) => {
	console.log("ReportList (dataObj)", dataObj);
	const [open, setOpen] = useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List
			sx={{ width: "100%", bgcolor: "background.paper" }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id={`ReportList-${title}`}>
					<h3>{title}</h3>
				</ListSubheader>
			}
		>
			<ListItemButton
				onClick={e => handleClick(e, "Settings")}
				sx={{
					width: "100%",
					"&.Mui-selected": {
						backgroundColor: theme.palette.selected
					},
					"&.MuiListItemButton-root:hover": {
						backgroundColor: theme.palette.hover.list
					}
				}}
			>
				<ListItemIcon>
					<GroupsIcon />
				</ListItemIcon>
				<ListItemText
					primary="Direct Oversight"
					secondary={dataObj.oversightTotal}
				/>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Divider />
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{dataObj.oversight.map(obj => {
						return Object.entries(obj).map(([label, value]) => {
							return (
								<>
									<ListItemButton
										key={`${title}-${label}`}
										sx={{
											width: "100%",
											whiteSpace: "no-wrap",
											"&.Mui-selected": {
												backgroundColor: theme.palette.selected
											},
											"&.MuiListItemButton-root:hover": {
												backgroundColor: theme.palette.hover.list
											},
											p: "0 2em"
										}}
									>
										<ListItemIcon>
											<PersonIcon sx={{ color: theme.palette.gsb.primary }} />
										</ListItemIcon>

										<ListItemText
											primary={label}
											secondary={`${value} Users`}
										/>
									</ListItemButton>
									<Divider
										component="li"
										variant="inset"
										sx={{ backgroundColor: theme.palette.gsb.primary }}
									/>
								</>
							);
						});
					})}
				</List>
			</Collapse>
			<ListItemButton
				sx={{
					width: "100%",
					"&.Mui-selected": {
						backgroundColor: theme.palette.selected
					},
					"&.MuiListItemButton-root:hover": {
						backgroundColor: theme.palette.hover.list
					}
				}}
			>
				<ListItemIcon>
					<GroupsIcon />
				</ListItemIcon>
				<ListItemText
					primary="Total In and Below Your Heirachy"
					secondary={dataObj.hierarchy}
				/>
			</ListItemButton>
		</List>
	);
};

const Report = ({ dataset }) => {
	const theme = useTheme();
	const [data, setData] = useState({});
	const [dataForLBC, setDataForLBC] = useState([]);
	const [dataForABC, setDataForABC] = useState([]);
	const [dataForGBC, setDataForGBC] = useState([]);
	const [dataForLR, setDataForLR] = useState({});
	const [dataForAR, setDataForAR] = useState({});
	const [dataForGR, setDataForGR] = useState({});

	const { user, setUser } = useContext(UserContext);
	const roletypes = [];
	for (let i = user.role.id; i <= 7; i++) {
		roletypes.push(i);
	}
	useEffect(() => {
		setData(dataset);
		console.log(user);
	}, []);

	//// FEATURE ENGINEERING
	useEffect(() => {
		// LEAVING
		if (Object.entries(data).length > 0) {
			console.log(data.own.leaving);
			let temp = data.own.leaving.map(entry =>
				entry.tasks.map(val => val.progress)
			);
			[
				{ field: "leaving", fn: setDataForLR, check: dataForLR },
				{ field: "assigned", fn: setDataForAR, check: dataForAR },
				{ field: "gaining", fn: setDataForGR, check: dataForGR }
			].forEach(obj => {
				const { field, fn, check } = obj;
				if (Object.keys(check).length === 0) {
					const oversight = roletypes.map(r => {
						switch (r) {
							case 2:
								return {
									["Command Admins"]: data.own[field].filter(
										entry => entry.role.id === 2
									).length,
									["Delta Admins"]: data.own[field].filter(
										entry => entry.role.id === 3
									).length
								};
							case 4:
								return {
									["Installation Admins"]: data.own[field].filter(
										entry => entry.role.id === 4
									).length
								};
							case 5:
								return {
									["Squadron Admins"]: data.own[field].filter(
										entry => entry.role.id === 5
									).length
								};
							case 6:
								return {
									["Task Approvers"]: data.own[field].filter(
										entry => entry.role.id === 6
									).length
								};
							case 7:
								return {
									["Users"]: data.own[field].filter(
										entry => entry.role.id === 7
									).length
								};
							default:
								break;
						}
					});
					console.log("OVERSIGHT", { oversight });
					fn({
						oversightTotal: data.own[field].length,
						oversight,
						hierarchy: data.total[field].length
					});
				}
			});

			let temp2 = data.own.leaving.map(value => {
				return {
					firstName: value.firstName,
					lastName: value.lastName,
					email: value.email,
					dsn: value.dsn
				};
			});

			let returnTemp = [];
			let nos = [];
			let com = [];
			temp.forEach((entry, idx) => {
				let nos = entry.filter(word => word === "NOT_STARTED").length;
				let com = entry.filter(word => word === "COMPLETED").length;

				returnTemp.push({
					name: idx,
					"NOT STARTED": nos,
					COMPLETED: com,
					person: temp2[idx],
					point: [nos, com]
				});
			});
			setDataForLBC(returnTemp);
		}

		// ASSIGNED
		if (Object.entries(data).length > 0) {
			let temp = data.own.assigned.map(entry =>
				entry.tasks.map(val => val.progress)
			);
			let temp2 = data.own.assigned.map(value => {
				return {
					firstName: value.firstName,
					lastName: value.lastName,
					email: value.email,
					dsn: value.dsn
				};
			});

			let returnTemp = [];
			let nos = [];
			let com = [];
			temp.forEach((entry, idx) => {
				let nos = entry.filter(word => word === "NOT_STARTED").length;
				let com = entry.filter(word => word === "COMPLETED").length;

				returnTemp.push({
					name: idx,
					"NOT STARTED": nos,
					COMPLETED: com,
					person: temp2[idx],
					point: [nos, com]
				});
			});
			setDataForABC(returnTemp);
		}

		// GAINING
		if (Object.entries(data).length > 0) {
			console.log("useeffect", data.own.gaining);
			let temp = data.own.gaining.map(entry =>
				entry.tasks.map(val => val.progress)
			);
			let temp2 = data.own.gaining.map(value => {
				return {
					firstName: value.firstName,
					lastName: value.lastName,
					email: value.email,
					dsn: value.dsn
				};
			});

			let returnTemp = [];
			let nos = [];
			let com = [];
			temp.forEach((entry, idx) => {
				let nos = entry.filter(word => word === "NOT_STARTED").length;
				let com = entry.filter(word => word === "COMPLETED").length;

				returnTemp.push({
					xlabels: idx + 1,
					"NOT STARTED": nos,
					COMPLETED: com,
					person: temp2[idx],
					point: [nos, com]
				});
			});
			setDataForGBC(returnTemp);
		}
	}, [data]);
	//// END OF FEATURE ENGINEERING

	var tooltip;
	const CustomTooltip = ({ active, payload }) => {
		if (!active || !tooltip) return null;
		for (const bar of payload)
			if (bar.dataKey === tooltip) {
				console.log(bar);
				return (
					<div
						style={{
							backgroundColor: theme.palette.gsb.background,
							color: theme.palette.gsb.text,
							borderRadius: "6px",
							padding: "0.5em",
							opacity: "0.85",
							boxShadow:
								theme.palette.mode === "light"
									? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
									: "0 .75em 1.5em -.185em rgba(	0, 0, 0,.9), 0 0 1px rgba(	0, 0, 0,.02)"
						}}
					>
						<span>
							{bar.payload.person.firstName} {bar.payload.person.lastName}
						</span>
						<br />
						<span>{bar.payload.person.email}</span>
						<br />
						<span>{bar.payload.person.dsn}</span>
						<br />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								flexWrap: "nowrap"
							}}
						>
							<span>Not Completed {bar.payload.point[0]}</span>
							<span>Completed {bar.payload.point[1]}</span>
						</div>
					</div>
				);
			}
		return null;
	};

	if (Object.entries(data).length === 0) return <Loading />;

	return (
		<>
			<CssBaseline />
			<Paper
				sx={{
					borderRadius: "6px",
					m: "0 2rem",
					boxShadow:
						theme.palette.mode === "light"
							? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
							: "0 .75em 1.5em -.185em rgba(	0, 0, 0,.9), 0 0 1px rgba(	0, 0, 0,.02)"
				}}
			>
				<Container
					sx={{
						textAlign: "center",
						pt: "0.1rem"
					}}
				>
					<h1>
						Report for {user.firstName} {user.lastName}
					</h1>
				</Container>

				<Grid container spacing={2} sx={{ p: "0 0.25rem" }}>
					<Grid
						item
						xs={4}
						sx={{
							textAlign: "left",
							p: "0.1rem",
							height: "100%"
						}}
					>
						{Object.keys(dataForLR).length > 0 && (
							<ReportList title="LEAVING" dataObj={dataForLR} theme={theme} />
						)}
					</Grid>
					<Grid
						item
						xs={4}
						sx={{
							textAlign: "left",
							p: "0.1rem",
							height: "100%"
						}}
					>
						{Object.keys(dataForAR).length > 0 && (
							<ReportList title="ASSIGNED" dataObj={dataForAR} theme={theme} />
						)}
					</Grid>
					<Grid
						item
						xs={4}
						sx={{
							textAlign: "left",
							p: "0.1rem",
							height: "100%"
						}}
					>
						{Object.keys(dataForLR).length > 0 && (
							<ReportList title="GAINING" dataObj={dataForGR} theme={theme} />
						)}
					</Grid>
				</Grid>
			</Paper>
			<Toolbar />

			<Paper
				sx={{
					borderRadius: "6px",
					m: "0 2rem",
					boxShadow:
						theme.palette.mode === "light"
							? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
							: "0 .75em 1.5em -.185em rgba(	0, 0, 0,.9), 0 0 1px rgba(	0, 0, 0,.02)"
				}}
			>
				<h2
					style={{
						width: "100%",
						textAlign: "center",
						padding: "0.5rem 0",
						borderTopRightRadius: "6px",
						borderTopLeftRadius: "6px",
						backgroundColor: theme.palette.gsb.background,
						color: theme.palette.gsb.text
					}}
				>
					Losing Units
				</h2>
				<ResponsiveContainer width="95%" height={500}>
					<BarChart
						width={1000}
						height={500}
						data={dataForLBC}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						label="heaf"
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip
							cursor={{ fill: theme.palette.hover.table }}
							content={<CustomTooltip />}
						/>
						<Legend />
						<Bar
							dataKey="NOT STARTED"
							fill={
								theme.palette.mode === "light"
									? theme.astroUXDSTheme.tag.tag2.lighten2
									: theme.astroUXDSTheme.tag.tag2.darken2
							}
							name="NOT STARTED"
							onMouseOver={() => (tooltip = "NOT STARTED")}
						/>
						<Bar
							dataKey="COMPLETED"
							fill={
								theme.palette.mode === "light"
									? theme.astroUXDSTheme.tag.tag1.lighten2
									: theme.astroUXDSTheme.tag.tag1.darken2
							}
							name="COMPLETED"
							onMouseOver={() => (tooltip = "COMPLETED")}
						/>
					</BarChart>
				</ResponsiveContainer>
			</Paper>
			<Toolbar />
			<Paper
				sx={{
					m: "0 2rem",
					borderRadius: "6px",
					boxShadow:
						theme.palette.mode === "light"
							? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
							: "0 .75em 1.5em -.185em rgba(	0, 0, 0,.9), 0 0 1px rgba(	0, 0, 0,.02)"
				}}
			>
				<h2
					style={{
						width: "100%",
						textAlign: "center",
						padding: "0.5rem 0",
						borderTopRightRadius: "6px",
						borderTopLeftRadius: "6px",
						backgroundColor: theme.palette.gsb.background,
						color: theme.palette.gsb.text
					}}
				>
					Assigned Units
				</h2>

				<ResponsiveContainer width="95%" height={500}>
					<BarChart
						width={1000}
						height={500}
						data={dataForABC}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						label="heaf"
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip
							cursor={{ fill: theme.palette.hover.table }}
							content={<CustomTooltip />}
						/>
						<Legend />
						<Bar
							dataKey="NOT STARTED"
							fill={
								theme.palette.mode === "light"
									? theme.astroUXDSTheme.tag.tag2.darken1
									: theme.astroUXDSTheme.tag.tag2.lighten1
							}
							name="NOT STARTED"
							onMouseOver={() => (tooltip = "NOT STARTED")}
						/>
						<Bar
							dataKey="COMPLETED"
							fill={
								theme.palette.mode === "light"
									? theme.astroUXDSTheme.tag.tag1.darken1
									: theme.astroUXDSTheme.tag.tag1.lighten1
							}
							name="COMPLETED"
							onMouseOver={() => (tooltip = "COMPLETED")}
						/>
					</BarChart>
				</ResponsiveContainer>
			</Paper>
			<Toolbar />
			<Paper
				sx={{
					borderRadius: "6px",
					m: "0 2rem",
					boxShadow:
						theme.palette.mode === "light"
							? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
							: "0 .75em 1.5em -.185em rgba(	0, 0, 0,.9), 0 0 1px rgba(	0, 0, 0,.02)"
				}}
			>
				<h2
					style={{
						width: "100%",
						textAlign: "center",
						padding: "0.5rem 0",
						borderTopRightRadius: "6px",
						borderTopLeftRadius: "6px",
						backgroundColor: theme.palette.gsb.background,
						color: theme.palette.gsb.text
					}}
				>
					Gaining Units
				</h2>
				<ResponsiveContainer width="95%" height={500}>
					<BarChart
						width={1000}
						height={500}
						data={dataForGBC}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						label="heaf"
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip
							cursor={{ fill: theme.palette.hover.table }}
							content={<CustomTooltip />}
						/>
						<Legend />
						<Bar
							dataKey="NOT STARTED"
							fill={
								theme.palette.mode === "light"
									? theme.astroUXDSTheme.tag.tag2.darken1
									: theme.astroUXDSTheme.tag.tag2.lighten1
							}
							name="NOT STARTED"
							onMouseOver={() => (tooltip = "NOT STARTED")}
						/>
						<Bar
							dataKey="COMPLETED"
							fill={
								theme.palette.mode === "light"
									? theme.astroUXDSTheme.tag.tag1.darken1
									: theme.astroUXDSTheme.tag.tag1.lighten1
							}
							name="COMPLETED"
							onMouseOver={() => (tooltip = "COMPLETED")}
						/>
					</BarChart>
				</ResponsiveContainer>
			</Paper>
		</>
	);
};

export default Report;
