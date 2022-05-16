// Base Package
import React, {
	useState,
	useEffect,
	useContext,
	useDeferredValue
} from "react";

// Our Packages
import { Loading } from "#components";
import { UserContext } from "#context";
import styles from "./ChartTypes.module.css";

// Third Party
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from "recharts";

import { Card, CardMedia, Grid, CardHeader } from "@mui/material";

const Report = ({ dataset }) => {
	const [data, setData] = useState({});
	const [dataForLBC, setDataForLBC] = useState([]);
	const [dataForABC, setDataForABC] = useState([]);
	const [dataForGBC, setDataForGBC] = useState([]);

	const { user, setUser } = useContext(UserContext);

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
					<div>
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
							{" "}
							<span>Not Completed {bar.payload.point[0]}</span>
							<span>Completed {bar.payload.point[1]}</span>
						</div>
					</div>
				);
			}
		return null;
	};

	if (Object.entries(data).length === 0) return <Loading />;

	const roletypes = [];
	for (let i = user.role.id; i <= 7; i++) {
		roletypes.push(i);
	}
	return (
		<section className={styles.report}>
			<h1>
				Report for {user.firstName} {user.lastName}
			</h1>
			<section className={styles.report_header}>
				<div>
					<h3>LEAVING</h3>
					<ul>
						<li>Direct Oversight: {data.own.leaving.length}</li>
						<ul>
							{roletypes.map(r => {
								if (r === 2)
									return (
										<li>
											Command Admins:{" "}
											{
												data.own.leaving.filter(entry => entry.role.id === 2)
													.length
											}
										</li>
									);
								if (r === 2)
									return (
										<li>
											Delta Admins:{" "}
											{
												data.own.leaving.filter(entry => entry.role.id === 3)
													.length
											}
										</li>
									);
								if (r === 4)
									return (
										<li>
											Installation Admins:{" "}
											{
												data.own.leaving.filter(entry => entry.role.id === 4)
													.length
											}
										</li>
									);
								if (r === 5)
									return (
										<li>
											Squadron Admins:{" "}
											{
												data.own.leaving.filter(entry => entry.role.id === 5)
													.length
											}
										</li>
									);
								if (r === 6)
									return (
										<li>
											Task Approvers:{" "}
											{
												data.own.leaving.filter(entry => entry.role.id === 6)
													.length
											}
										</li>
									);
								if (r === 7)
									return (
										<li>
											Users:{" "}
											{
												data.own.leaving.filter(entry => entry.role.id === 7)
													.length
											}
										</li>
									);
							})}
						</ul>
						<li>
							Total In and Below Your Heirachy: {data.total.leaving.length}
						</li>
					</ul>
				</div>
				<div>
					<h3>ASSIGNED</h3>
					<ul>
						<li>Direct Oversight: {data.own.assigned.length}</li>
						<ul>
							{roletypes.map(r => {
								if (r === 2)
									return (
										<li>
											Command Admins:{" "}
											{
												data.own.assigned.filter(entry => entry.role.id === 2)
													.length
											}
										</li>
									);
								if (r === 2)
									return (
										<li>
											Delta Admins:{" "}
											{
												data.own.assigned.filter(entry => entry.role.id === 3)
													.length
											}
										</li>
									);
								if (r === 4) {
									console.log(
										data.own.assigned.filter(entry => entry.role.id === 4)
									);
									return (
										<li>
											Installation Admins:{" "}
											{
												data.own.assigned.filter(entry => entry.role.id === 4)
													.length
											}
										</li>
									);
								}

								if (r === 5)
									return (
										<li>
											Squadron Admins:{" "}
											{
												data.own.assigned.filter(entry => entry.role.id === 5)
													.length
											}
										</li>
									);
								if (r === 6)
									return (
										<li>
											Task Approvers:{" "}
											{
												data.own.assigned.filter(entry => entry.role.id === 6)
													.length
											}
										</li>
									);
								if (r === 7)
									return (
										<li>
											Users:{" "}
											{
												data.own.assigned.filter(entry => entry.role.id === 7)
													.length
											}
										</li>
									);
							})}
						</ul>
						<li>
							Total In and Below Your Heirachy: {data.total.assigned.length}
						</li>
					</ul>
				</div>
				<div>
					<h3>GAINING</h3>
					<ul>
						<li>Direct Oversight: {data.own.gaining.length}</li>
						<ul>
							{roletypes.map(r => {
								if (r === 2)
									return (
										<li>
											Command Admins:{" "}
											{
												data.own.gaining.filter(entry => entry.role.id === 2)
													.length
											}
										</li>
									);
								if (r === 2)
									return (
										<li>
											Delta Admins:{" "}
											{
												data.own.gaining.filter(entry => entry.role.id === 3)
													.length
											}
										</li>
									);
								if (r === 4)
									return (
										<li>
											Installation Admins:{" "}
											{
												data.own.gaining.filter(entry => entry.role.id === 4)
													.length
											}
										</li>
									);
								if (r === 5)
									return (
										<li>
											Squadron Admins:{" "}
											{
												data.own.gaining.filter(entry => entry.role.id === 5)
													.length
											}
										</li>
									);
								if (r === 6)
									return (
										<li>
											Task Approvers:{" "}
											{
												data.own.gaining.filter(entry => entry.role.id === 6)
													.length
											}
										</li>
									);
								if (r === 7) {
									console.log(
										data.own.gaining.filter(entry => entry.role.id === 7)
									);
									return (
										<li>
											Users:{" "}
											{
												data.own.gaining.filter(entry => entry.role.id === 7)
													.length
											}
										</li>
									);
								}
							})}
						</ul>
						<li>
							Total In and Below Your Heirachy: {data.total.gaining.length}
						</li>
					</ul>
				</div>
			</section>

			<section>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justify="center"
				>
					<Card
						sx={{
							padding: "2rem",
							borderRadius: "2rem",
							boxShadow: "6px 6px 9px 2px rgba(0, 0, 0, 0.5)"
						}}
					>
						<CardHeader
							title="Leaving - Task Completion Status"
							data-testid="cardHeaderLeavingTitle"
						/>
						<BarChart width={1000} height={450} data={dataForLBC}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Bar
								dataKey="NOT STARTED"
								fill="#8884d8"
								name="NOT STARTED"
								onMouseOver={() => (tooltip = "NOT STARTED")}
							/>
							<Bar
								dataKey="COMPLETED"
								fill="#82ca9d"
								name="COMPLETED"
								onMouseOver={() => (tooltip = "COMPLETED")}
							/>
						</BarChart>{" "}
					</Card>
					<Card
						sx={{
							padding: "2rem",
							borderRadius: "2rem",
							boxShadow: "6px 6px 9px 2px rgba(0, 0, 0, 0.5)"
						}}
					>
						<CardHeader
							title="Assigned - Task Completion Status"
							data-testid="cardHeaderAssignedTitle"
						/>
						<BarChart width={1000} height={450} data={dataForABC}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Bar
								dataKey="NOT STARTED"
								fill="#8884d8"
								name="NOT STARTED"
								onMouseOver={() => (tooltip = "NOT STARTED")}
							/>
							<Bar
								dataKey="COMPLETED"
								fill="#82ca9d"
								name="COMPLETED"
								onMouseOver={() => (tooltip = "COMPLETED")}
							/>
						</BarChart>{" "}
					</Card>
					<Card
						sx={{
							padding: "2rem",
							borderRadius: "2rem",
							boxShadow: "6px 6px 9px 2px rgba(0, 0, 0, 0.5)"
						}}
					>
						<CardHeader
							title="Gaining - Task Completion Status"
							data-testid="cardHeaderGainingTitle"
						/>
						<CardMedia>
							<BarChart
								width={1000}
								height={450}
								data={dataForGBC}
								data-testid="cardHeaderGainingSVG"
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="xlabels" />
								<YAxis />
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Bar
									dataKey="NOT STARTED"
									fill="#8884d8"
									name="NOT STARTED"
									onMouseOver={() => (tooltip = "NOT STARTED")}
								/>
								<Bar
									dataKey="COMPLETED"
									fill="#82ca9d"
									name="COMPLETED"
									onMouseOver={() => (tooltip = "COMPLETED")}
								/>
							</BarChart>{" "}
						</CardMedia>
					</Card>
				</Grid>
			</section>
		</section>
	);
};

export default Report;
