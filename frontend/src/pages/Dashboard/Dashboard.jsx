import React, { useState, useEffect, useContext, useRef } from "react";

// Our Components and Utilities
import { PageContext, UserContext } from "#context";

import { UserAPI } from "#services";

// Third Party Components and Utilities
import { Paper, Tab, Button, Toolbar } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { UserTable, AdminTable, UserSettings, Analytics } from "#components";

// There is no longer a useNavigate state prop called role.
// There is now, instead, a UserContext object being provided
//   to all of App. I have performed some trickery to make
//   this UserContext stateful!! You can import the user object
//   and its setting function using const {user, setUser} = useContext(UserContext)
// This is one big refactor forward toward Firebase
//   integration and being able to track User auth --Tony

const Dashboard = () => {
	const { user, setUser } = useContext(UserContext);
	const { page } = useContext(PageContext);
	// State for Tabs
	const [tabValue, setTabValue] = useState("1");

	////////////////////////////////////////// USER VIEW ////////////////////////////////////

	// State for Users
	const [userData, setUserData] = useState(
		user?.tasks.sort((a, b) => a.id - b.id)
	);
	const [userInData, setUserInData] = useState(
		user?.tasks
			.sort((a, b) => a.id - b.id)
			.filter(entry => entry.task.kind === "IN_PROCESSING")
	);
	const [userOutData, setUserOutData] = useState(
		user?.tasks
			.sort((a, b) => a.id - b.id)
			.filter(entry => entry.task.kind === "OUT_PROCESSING")
	);

	////////////////////////////////////////// ADMIN VIEW ////////////////////////////////////

	// State for Admin and Admin Pagination

	const [revision, setRevision] = useState(0);

	const [data, setData] = useState(
		user?.tasksAssigned.sort((a, b) => a.id - b.id)
	);

	const [dataForAdminIn, setDataForAdminIn] = useState(
		user?.tasksAssigned
			.sort((a, b) => a.id - b.id)
			.filter(tasker => tasker.kind === "IN_PROCESSING")
	);
	const [totalAdminInPages, setTotalAdminInPages] = useState(0);
	const [adminInForLoop, setAdminInForLoop] = useState([]);

	const [dataForAdminOut, setDataForAdminOut] = useState(
		user?.tasksAssigned
			.sort((a, b) => a.id - b.id)
			.filter(tasker => tasker.kind === "OUT_PROCESSING")
	);
	const [totalAdminOutPages, setTotalAdminOutPages] = useState(0);
	const [adminOutForLoop, setAdminOutForLoop] = useState([]);

	const [adminTaskApprovers, setAdminTaskApprovers] = useState([]);

	// START OF FUNCTIONS FOR ADMIN VIEW PAGINATION LOGIC --Tony | Line 70 to 141

	// This useEffect is mostly for Admin View
	// I wouldn't worry about builing it out for Users
	// since the Users view has so few tasks compared
	// to the Admin view and pagination isn't needed.

	const retrieveTaskApproversThatShareAdminUnitID = e => {
		const taskApproversApi = new UserAPI();
		console.log("taskApproverAPI", user.assignedUnit);
		if (user.token !== undefined) {
			console.log("User Token: ", user.token);
			taskApproversApi
				.roleID(6)
				.assignedUnitID(user.assignedUnit.id)
				.limit(100)
				.get(user.token)
				.catch(err => console.log(err))
				.then(response => response.json())
				.then(taskapprovers => {
					if (taskapprovers.error === undefined) {
						const approvers = taskapprovers;
						console.log("approvers", { approvers });
						setAdminTaskApprovers(approvers.data);
					}
				})
				.catch(err => console.log(err));
		}
	};

	useEffect(retrieveTaskApproversThatShareAdminUnitID, []);

	useEffect(() => {
		let idxs = [];
		for (let i = 0; i < totalAdminInPages; i++) idxs.push(i);
		setAdminInForLoop(idxs);
	}, [user, totalAdminInPages]);

	useEffect(() => {
		let idxs = [];
		for (let i = 0; i < totalAdminOutPages; i++) idxs.push(i);
		setAdminOutForLoop(idxs);
	}, [user, totalAdminOutPages]);

	useEffect(() => {
		setDataForAdminIn(
			user?.tasksAssigned.filter(tasker => tasker.kind === "IN_PROCESSING")
		);
		setDataForAdminOut(
			user?.tasksAssigned.filter(tasker => tasker.kind === "OUT_PROCESSING")
		);
		setData(user?.tasksAssigned);
		setRevision(revision + 1);
	}, [user]);

	if (page === "Tasks") {
		if (user?.role?.kind === "USER") {
			if (userInData.length > 0 && userOutData.length > 0) {
				return (
					<TabContext value={tabValue}>
						<TabList onChange={(e, nv) => setTabValue(nv)} sx={{ ml: "4rem" }}>
							<Tab
								label="Inprocessing Tasks"
								value="1"
								data-testid="buttonInprocessingTasks"
							/>
							<Tab
								label="Outprocessing Tasks"
								value="2"
								data-testid="buttonOutprocessingTasks"
							/>
						</TabList>

						<TabPanel value="1">
							<Paper
								sx={{
									overflow: "hidden",
									borderRadius: "6px",
									m: "0 2rem"
								}}
							>
								{userData.length > 0 && <UserTable data={userInData} />}
							</Paper>
						</TabPanel>

						<TabPanel value="2">
							<Paper
								sx={{
									overflow: "hidden",
									borderRadius: "6px",
									m: "0 2rem"
								}}
							>
								{userData.length > 0 && <UserTable data={userOutData} />}
							</Paper>
						</TabPanel>
					</TabContext>
				);
			} else {
				return (
					<>
						{userInData.length > 0 && (
							<Paper
								sx={{
									overflow: "hidden",
									borderRadius: "6px",
									alignContent: "center",
									m: "0 2rem"
								}}
							>
								{userData.length > 0 && <UserTable data={userInData} />}
							</Paper>
						)}
						{userOutData.length > 0 && (
							<Paper
								sx={{
									overflow: "hidden",
									borderRadius: "6px",
									m: "0 2rem"
								}}
							>
								{userData.length > 0 && <UserTable data={userOutData} />}
							</Paper>
						)}
					</>
				);
			}
		} else if (user?.role?.kind?.includes("ADMIN")) {
			return (
				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)} sx={{ ml: "4rem" }}>
						<Tab
							label="Inprocessing Tasks"
							value="1"
							data-testid="buttonInprocessingTasks"
						/>
						<Tab
							label="Outprocessing Tasks"
							value="2"
							data-testid="buttonOutprocessingTasks"
						/>
					</TabList>

					<TabPanel value="1">
						<Paper
							sx={{
								overflow: "hidden",
								borderRadius: "6px",
								m: "0 2rem"
							}}
						>
							{dataForAdminIn.length > 0 && (
								<AdminTable
									key={revision}
									data={dataForAdminIn}
									approverList={adminTaskApprovers}
									kind={"IN_PROCESSING"}
								/>
							)}
						</Paper>
					</TabPanel>

					<TabPanel value="2">
						<Paper
							sx={{
								overflow: "hidden",
								borderRadius: "6px",
								m: "0 2rem"
							}}
						>
							{dataForAdminIn.length > 0 && (
								<AdminTable
									data={dataForAdminOut}
									approverList={adminTaskApprovers}
									kind={"OUT_PROCESSING"}
								/>
							)}
						</Paper>
					</TabPanel>
				</TabContext>
			);
		}
	} else if (page === "Analytics") {
		return (
			<>
				{user?.role?.kind?.includes("ADMIN") ? <Analytics user={user} /> : ""}
			</>
		);
	} else if (page === "Settings") {
		return <UserSettings settings={user} />;
	} else {
		// Generic View to Show if All Else Fails
		return (
			<>
				<h2>This is a Default Catchall View</h2>
				<p>Somehow authenticated but not as a viable role and made it here.</p>
			</>
		);
	}
};
export default Dashboard;
