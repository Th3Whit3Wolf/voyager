// No tests yet, since there is no real dashboard.
// This is a demo dashboard as a placeholder
// when actual dashboards are built up, switch to TDD

import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

import useFetchMock from "../../hooks/useFetchMock";

import useFetch from "../../hooks/useFetch";

// Third Party Components and Utilities
import { Paper, Tab, TableContainer } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserTable from "../../components/Tables/UserTable/UserTable";
import AdminTable from "../../components/Tables/AdminTable/AdminTable";

// There is no longer a useNavigate state prop called role.
// There is now, instead, a UserContext object being provided
//   to all of App. In general, UserContext has two entities
//   a role with a string as a key which should be role, admin, or nothing
//   a user which containers the User object returned from the API after logging in
//   As an example, below, there is a context variable from UserContext and it
//   has a context.role and a context.User . You will see these also used in the
//   Header component. Generally, the logout button (in the Header) should
//   obliterate UserContext. This is one big refactor forward toward Firebase
//   integration and being able to track User auth --Tony

import Loading from "../../components/Loading/Loading";

const Dashboard = () => {
	const [tabValue, setTabValue] = useState("1");
	//const [data, setData] = setData(null);
	// These variables likely will vanish once the backend is up and working (or be reformed into say a typical useFetch)

	const context = useContext(UserContext);

	console.log(context.role, context.user);

	const { data, error, isLoading } = useFetchMock(
		`/api/mock/${context.role}`,
		0,
		500
	); // only created data for User , not Admin yet, Admin gives a console log

	useFetch(`http://localhost:8081/api/v1/tasks`);

	//console.log(`second fetch: ${data2}`);
	// useEffect(() => {
	// 	var newData = unfiltereddata.filter(task => task.assignerID == 66);
	// 	setData(newData);
	// }, [unfiltereddata]);

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
	if (context.role === "user") {
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
	if (context.role === "admin") {
		return (
			<>
				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)}>
						<Tab label="Inprocessing Tasks" value="1" />
						<Tab label="Outprocessing Tasks" value="2" />
						<Tab label="Modify Admins" value="3" />
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

					<TabPanel value="3">
						This is where I modify Admins.
						<p>
							This should show as a table view, where each row has a status and
							can be toggled as complete or not. Clicking on a row might show
							more info?
						</p>
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
