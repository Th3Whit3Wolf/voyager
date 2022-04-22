// No tests yet, since there is no real dashboard.
// This is a demo dashboard as a placeholder
// when actual dashboards are built up, switch to TDD

import React, { useState, useEffect } from "react";
import useFetchMock from "../../hooks/useFetchMock";

// Third Party Components and Utilities
import {
	Paper,
	Tab,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Switch
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// NOTE: Currently Dashboard is taking a prop called
// role. This is coming from Login.jsx where the Fake
// User and Admin navigations pass it in order to
// emulate a type of role since the Firebase Store
// and the backend API need to be set up. I suspect
// all of this will be refactored a lot in the future
// but I just wanted to have something to attach
// Dasboard too in the Routes of App.jsx
// Please refactor and delete all this as necessary,
// This comment is just to help other developers
// read this more easily. --Tony

import { useLocation } from "react-router-dom";

const Dashboard = () => {
	const [tabValue, setTabValue] = useState("1");

	// These variables likely will vanish once the backend is up and working (or be reformed into say a typical useFetch)
	const location = useLocation(); // props are being passed with navigate, so I need useLocation go grab them
	const role = location.state.role;
	const { data, error, isLoading } = useFetchMock(`/api/mock/${role}`, 0, 1000); // only created data for User , not Admin yet, Admin gives a console log

	useEffect(() => {
		console.log(data, error, isLoading);
	}, [data, error, isLoading]);

	// Setting up Different Views Based on Role
	// There are many ways to do conditional views, but with
	// so many possible concurrent views, early returns might be the best
	// way with a final return that always shows in the event all other
	// conditionals do not trigger

	if (isLoading) return <p>Loading data...</p>;
	// User View ... this conditional compares to role from location, should be changed to AUTH obj later
	if (role === "user") {
		return (
			<>
				<h1>User Dashboard</h1>

				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)}>
						<Tab label="Inprocessing Tasks" value="1" />
						<Tab label="Outprocessing Tasks" value="2" />
					</TabList>

					<TabPanel value="1">
						These is where my in-processing task list shows up.
						<p>
							This should show as a table view, where each row has a status and
							can be toggled as complete or not. Clicking on a might show more
							info?
						</p>
						<TableContainer component={Paper}>
							<Table size={"small"}>
								<TableHead>
									<TableRow>
										<TableCell></TableCell>
										<TableCell>Task Name</TableCell>
										<TableCell>Short Description</TableCell>
										<TableCell>POC Name</TableCell>
										<TableCell>POC Phone</TableCell>
										<TableCell>POC Email</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow hover={true}>
										<TableCell>
											<Switch />
										</TableCell>
										<TableCell>Form 55</TableCell>
										<TableCell>
											Send your current form 55 to Safety Rep.
										</TableCell>
										<TableCell>Capt Safety Pants</TableCell>
										<TableCell>(123) 456-7899</TableCell>
										<TableCell>safety.pants@email.com</TableCell>
									</TableRow>
									<TableRow hover={true}>
										<TableCell>
											<Switch />
										</TableCell>
										<TableCell>GTC Activation</TableCell>
										<TableCell>Go see Sally Sue to activate GTC</TableCell>
										<TableCell>Ms. Sally Sue</TableCell>
										<TableCell>(123) 456-7899</TableCell>
										<TableCell>sally.sue@email.com</TableCell>
									</TableRow>
									{data.map(entry => {
										<TableRow>
											<TableCell>
												<Switch />
											</TableCell>
											<TableCell>entry.title</TableCell>
										</TableRow>;
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</TabPanel>

					<TabPanel value="2">
						These is where my out-processing task list shows up
						<p>
							This should show as a table view, where each row has a status and
							can be toggled as complete or not. Clicking on a might show more
							info?
						</p>
						<TableContainer component={Paper}>
							<Table size={"small"}>
								<TableHead>
									<TableRow>
										<TableCell>Checkbox</TableCell>
										<TableCell>Task Name</TableCell>
										<TableCell>Short Description</TableCell>
										<TableCell>POC Name</TableCell>
										<TableCell>POC Phone</TableCell>
										<TableCell>POC Email</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow hover={true}>
										<TableCell>CB Icon Here</TableCell>
										<TableCell>Form 55</TableCell>
										<TableCell>
											Send your current form 55 to Safety Rep.
										</TableCell>
										<TableCell>Capt Safety Pants</TableCell>
										<TableCell>(123) 456-7899</TableCell>
										<TableCell>safety.pants@email.com</TableCell>
									</TableRow>
									<TableRow hover={true}>
										<TableCell>CB Icon Here</TableCell>
										<TableCell>GTC Activation</TableCell>
										<TableCell>Go see Sally Sue to activate GTC</TableCell>
										<TableCell>Ms. Sally Sue</TableCell>
										<TableCell>(123) 456-7899</TableCell>
										<TableCell>sally.sue@email.com</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</TabPanel>
				</TabContext>
			</>
		);
	}

	// Generic Admin View ... this conditional compares to role from location, should be changed to AUTH obj later
	if (role === "admin") {
		return (
			<>
				<h1>Admin Dashboard</h1>

				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)}>
						<Tab label="Inprocessing Tasks" value="1" />
						<Tab label="Outprocessing Tasks" value="2" />
					</TabList>

					<TabPanel value="1">
						<p>
							These is where all the admin in-processing tasks should show up as
							a table view.
						</p>
						<p>
							Each row in a Table that matches the Role of the logged in Admin
							should allow for Delete, Row-wise Entry Patches, or adding a new
							row to the bottom.
						</p>
					</TabPanel>

					<TabPanel value="2">
						<p>
							These is where all the admin out-processing tasks should show up
							as a table view.
						</p>
						<p>
							Each row in a Table that matches the Role of the logged in Admin
							should allow for Delete, Row-wise Entry Patches, or adding a new
							row to the bottom.
						</p>{" "}
					</TabPanel>
				</TabContext>
			</>
		);
	}

	// Installation Admin View

	// Site Admin View

	// Generic View to Show if All Else Fails
	return (
		<>
			<h2>This is a Default Catchall View</h2>
			<p>Somehow authenticated but not as a viable role and made it here.</p>
		</>
	);
};

export default Dashboard;
