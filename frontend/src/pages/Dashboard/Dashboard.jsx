// No tests yet, since there is no real dashboard.
// This is a demo dashboard as a placeholder
// when actual dashboards are built up, switch to TDD

import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

// Third Party Components and Utilities
import { Paper, Tab, TableContainer, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	UserTable,
	AdminTable,
	UserSettings,
	ModifyAdminTable
} from "../../components";

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
	const context = useContext(UserContext);
	const data = context.user.tasksAssigned;

	// State for Tabs
	const [tabValue, setTabValue] = useState("1");

	// State for Users
	const [userData, setUserData] = useState(context.user.tasks);
	const [userInData, setUserInData] = useState([]);
	const [userOutData, setUserOutData] = useState([]);

	// State for Admin and Admin Pagination
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(20);
	const [revision, setRevision] = useState(0);

	const [dataForAdminIn, setDataForAdminIn] = useState([]);
	const [totalAdminInPages, setTotalAdminInPages] = useState(0);
	const [adminInForLoop, setAdminInForLoop] = useState([]);

	const [dataForAdminOut, setDataForAdminOut] = useState([]);
	const [totalAdminOutPages, setTotalAdminOutPages] = useState(0);
	const [adminOutForLoop, setAdminOutForLoop] = useState([]);

	// START OF FUNCTIONS FOR USER VIEW

	useEffect(() => {
		setUserData(context.user.tasks);
	}, []);

	useEffect(() => {
		if (userData.length > 0) {
			setUserInData(
				userData.filter(entry => entry.task.kind === "IN_PROCESSING")
			);
			setUserOutData(
				userData.filter(entry => entry.task.kind === "OUT_PROCESSING")
			);
		}
	}, [userData]);

	// START OF FUNCTIONS FOR ADMIN VIEW PAGINATION LOGIC --Tony | Line 47 to 98

	// This useEffect is mostly for Admin View
	// I wouldn't worry about builing it out for Users
	// since the Users view has so few tasks compared
	// to the Admin view and pagination isn't needed.

	useEffect(() => {
		setDataForAdminIn(
			context.user.tasksAssigned.filter(
				tasker => tasker.kind === "IN_PROCESSING"
			)
		);
		setDataForAdminOut(
			context.user.tasksAssigned.filter(
				tasker => tasker.kind === "OUT_PROCESSING"
			)
		);
	}, []);

	useEffect(() => {
		setTotalAdminInPages(parseInt(dataForAdminIn.length / (end - start)) + 1);
		setTotalAdminOutPages(parseInt(dataForAdminOut.length / (end - start)) + 1);
	}, [dataForAdminIn, setTotalAdminOutPages, start, end]);

	useEffect(() => {
		let idxs = [];
		for (let i = 0; i < totalAdminInPages; i++) idxs.push(i);
		setAdminInForLoop(idxs);
	}, [totalAdminInPages]);

	useEffect(() => {
		let idxs = [];
		for (let i = 0; i < totalAdminOutPages; i++) idxs.push(i);
		setAdminOutForLoop(idxs);
	}, [totalAdminOutPages]);

	const changeInprocessPage = e => {
		console.log(e.target.value);
		setStart((parseInt(e.target.value) - 1) * (end - start));
		setEnd(parseInt(e.target.value) * (end - start));
		setRevision(revision + 1);
	};

	const changeOutprocessPage = e => {
		console.log(e.target.value);
		setStart((parseInt(e.target.value) - 1) * (end - start));
		setEnd(parseInt(e.target.value) * (end - start));
		setRevision(revision + 1);
	};

	// END OF FUNCTIONS FOR ADMIN VIEW PAGINATION LOGIC --Tony | Line 50 to 98

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
						<TableContainer component={Paper}>
							{userData.length > 0 && <UserTable alldata={userInData} />}
						</TableContainer>
					</TabPanel>

					<TabPanel value="2">
						<TableContainer component={Paper}>
							{userData.length > 0 && <UserTable alldata={userOutData} />}
						</TableContainer>
					</TabPanel>

					<TabPanel value="3">
						<UserSettings settings={context.user} />
					</TabPanel>
				</TabContext>
			</>
		);
	}

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
							Displaying {dataForAdminIn.slice(start, end).length} of{" "}
							{dataForAdminIn.length} Inprocessing Tasks.
						</p>
						{adminInForLoop.map(idx => (
							<Button
								sx={{ minWidth: "10px" }}
								key={idx}
								onClick={changeInprocessPage}
								value={idx + 1}
							>
								{idx + 1}
							</Button>
						))}
						<TableContainer component={Paper}>
							{dataForAdminIn.length > 0 && (
								<AdminTable
									key={revision}
									data={dataForAdminIn}
									start={start}
									end={end}
									revision={revision}
								/>
							)}
						</TableContainer>
					</TabPanel>

					<TabPanel value="2">
						<p>
							Displaying {dataForAdminOut.slice(start, end).length} of{" "}
							{dataForAdminOut.length} Outprocessing Tasks.
						</p>
						{adminOutForLoop.map(idx => (
							<Button
								sx={{ minWidth: "10px" }}
								key={idx}
								onClick={changeOutprocessPage}
								value={idx + 1}
							>
								{idx + 1}
							</Button>
						))}
						<TableContainer component={Paper}>
							{dataForAdminIn.length > 0 && (
								<AdminTable
									key={revision}
									data={dataForAdminOut}
									start={start}
									end={end}
									revision={revision}
								/>
							)}
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
							<ModifyAdminTable
								data={
									tabValue === "3"
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

	// Generic View to Show if All Else Fails
	return (
		<>
			<h2>This is a Default Catchall View</h2>
			<p>Somehow authenticated but not as a viable role and made it here.</p>
		</>
	);
};

export default Dashboard;
