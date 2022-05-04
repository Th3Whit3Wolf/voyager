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
import { UserTable, AdminTable, UserSettings } from "../../components";

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

const Dashboard = () => {
	const [tabValue, setTabValue] = useState("1");
	//const [data, setData] = useState([]);
	// These variables likely will vanish once the backend is up and working (or be reformed into say a typical useFetch)
	//const [isLoading, setIsLoading] = useState(false);
	const context = useContext(UserContext);

	console.log(context.user);

	const userData = context.user.Tasks;

	const data = context.user.TasksAssigners;
	//console.log(`userData: ${userData}`);
	//console.log(`data: ${data}`);
	// Setting up Different Views Based on Role
	// There are many ways to do conditional views, but with
	// so many possible concurrent views, early returns might be the best
	// way with a final return that always shows in the event all other
	// conditionals do not trigger

	//if (isLoading) return <Loading />;
	// User View ... this conditional compares to role from location, should be changed to AUTH obj later

	if (context.user.role.kind === "USER") {
		return (
			<>
				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)}>
						<Tab label="Inprocessing Tasks" value="1" />
						<Tab label="Outprocessing Tasks" value="2" />
						<Tab label="User Settings" value="3" />
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
										? userData?.filter(
												tasker => tasker.kind === "IN_PROCESSING"
										  )
										: userData?.filter(
												tasker => tasker.kind === "Outprocessing"
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
										? userData?.filter(
												tasker => tasker.kind === "IN_PROCESSING"
										  )
										: userData?.filter(
												tasker => tasker.kind === "Outprocessing"
										  )
								}
							/>
						</TableContainer>
					</TabPanel>

					<TabPanel value="3">
						<h3>User Settings</h3>
						First Name: {context.user.firstName}
						Last Name: {context.user.lastName}
					</TabPanel>
				</TabContext>
			</>
		);
	}

	// Generic Admin View ... this conditional compares to role from location, should be changed to AUTH obj later
	if (context.user.role.kind.includes("ADMIN")) {
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
										? data?.filter(tasker => tasker.kind === "IN_PROCESSING")
										: data?.filter(tasker => tasker.kind === "OUT_PROCESSING")
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
										? data?.filter(tasker => tasker.kind === "IN_PROCESSING")
										: data?.filter(tasker => tasker.kind === "OUT_PROCESSING")
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
						<TableContainer component={Paper}>
							<AdminTable
								data={
									tabValue === "1"
										? data?.filter(tasker => tasker.kind === "IN_PROCESSING")
										: data?.filter(tasker => tasker.kind === "OUT_PROCESSING")
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
