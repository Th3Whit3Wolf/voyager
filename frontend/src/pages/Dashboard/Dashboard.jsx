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
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Switch
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserTable from "../../components/Tables/UserTable/UserTable";
import AdminTable from "../../components/Tables/AdminTable/AdminTable";
//import AdminTable from "../../components/Tables/AdminTable/AdminTable";
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
import Loading from "../../components/Loading/Loading";

const Dashboard = () => {
	const [tabValue, setTabValue] = useState("1");

	// These variables likely will vanish once the backend is up and working (or be reformed into say a typical useFetch)
	const location = useLocation(); // props are being passed with navigate, so I need useLocation go grab them
	const role = location.state.role;
	const { data, error, isLoading } = useFetchMock(`/api/mock/${role}`, 0, 500); // only created data for User , not Admin yet, Admin gives a console log

	// useEffect(() => {
	// 	console.log(data, error, isLoading);
	// }, [data, error, isLoading]);

	// Setting up Different Views Based on Role
	// There are many ways to do conditional views, but with
	// so many possible concurrent views, early returns might be the best
	// way with a final return that always shows in the event all other
	// conditionals do not trigger

	if (isLoading) return <Loading />;
	// User View ... this conditional compares to role from location, should be changed to AUTH obj later

	// Note, this should be turned into components. I would almost never keep a component looking like this,
	// but for sake of communicating with other Devs in the project, I have it in long form here so the logic
	// is easier to see all in one page. But I can see someone taking it down to User, Site Admin, Base Admin, etc
	// then the conditional early returns will turn this Dashboard.jsx into like 5 lines of code down below, and different
	// people can work on different sections without stepping on each others toes. --Tony
	if (role === "user") {
		return (
			<>
				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)}>
						<Tab label="Inprocessing Tasks" value="1" />
						<Tab label="Outprocessing Tasks" value="2" />
					</TabList>

					<TabPanel value="1">
						This is where my in-processing task list shows up.
						<p>
							This should show as a table view, where each row has a status and
							can be toggled as complete or not. Clicking on a row might show
							more info?
						</p>
						<TableContainer component={Paper}>
							<UserTable
								data={
									tabValue === "1"
										? data.filter(tasker => tasker.task_type === "Inprocessing")
										: data.filter(
												tasker => tasker.task_type === "Outprocessing"
										  )
								}
							/>
						</TableContainer>
					</TabPanel>

					<TabPanel value="2">
						These is where my out-processing task list shows up
						<p>
							This should show as a table view, where each row has a status and
							can be toggled as complete or not. Clicking on a might show more
							info?{" "}
						</p>
						<TableContainer component={Paper}>
							<UserTable
								data={
									tabValue === "1"
										? data.filter(tasker => tasker.task_type === "Inprocessing")
										: data.filter(
												tasker => tasker.task_type === "Outprocessing"
										  )
								}
							/>
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
						<TableContainer component={Paper}>
							<AdminTable
								data={
									tabValue === "1"
										? data.filter(tasker => tasker.task_type === "Inprocessing")
										: data.filter(
												tasker => tasker.task_type === "Outprocessing"
										  )
								}
							/>
						</TableContainer>
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
						<TableContainer component={Paper}>
							<AdminTable
								data={
									tabValue === "1"
										? data.filter(tasker => tasker.task_type === "Inprocessing")
										: data.filter(
												tasker => tasker.task_type === "Outprocessing"
										  )
								}
							/>
						</TableContainer>
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
