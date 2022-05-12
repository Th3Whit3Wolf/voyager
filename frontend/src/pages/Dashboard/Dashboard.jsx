import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "#context";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Our Components and Utilities
import { UserAPI } from "#services/api/UserAPI";

// Third Party Components and Utilities
import { Paper, Tab, TableContainer, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	UserTable,
	AdminTable,
	UserSettings,
	ModifyAdminTable
} from "#components";

// There is no longer a useNavigate state prop called role.
// There is now, instead, a UserContext object being provided
//   to all of App. I have performed some trickery to make
//   this UserContext stateful!! You can import the user object
//   and its setting function using const {user, setUser} = useContext(UserContext)
// This is one big refactor forward toward Firebase
//   integration and being able to track User auth --Tony

const Dashboard = () => {
	const { user, setUser } = useContext(UserContext);

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
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(20);
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

	const retrieveTaskApproversThatShareAdminUnitID = () => {
		const taskApproversApi = new UserAPI();
		if (user?.assignedUnit?.id) {
			// 	console.log(user.assignedUnit);
			// 	taskApproversApi
			// 		.roleID(6)
			// 		.assignedUnitID(user.assignedUnit.id)
			// 		.limit(100)
			// 		.get()
			// 		.catch(err => console.log(err))
			// 		.then(response => response.json())
			// 		.then(taskapprovers => {
			// 			const approvers = taskapprovers;
			// 			console.log(approvers);
			// 			setAdminTaskApprovers(approvers.data);
			// 		})
			// 		.catch(err => console.log(err));
			// }
			var requestOptions = {
				method: "GET",
				redirect: "follow"
			};

			fetch(
				"http://localhost:8081/api/v1/users?roleID=6&assignedUnitID=3",
				requestOptions
			)
				.catch(err => console.log(err))
				.then(response => response.json())
				.then(taskapprovers => {
					const approvers = taskapprovers;
					console.log(approvers);
					setAdminTaskApprovers(approvers.data);
				})
				.catch(err => console.log(err));
		}
	};

	const calculateTotalPaginationPages = () => {
		if (dataForAdminIn)
			setTotalAdminInPages(parseInt(dataForAdminIn.length / (end - start)) + 1);
		if (dataForAdminOut)
			setTotalAdminOutPages(
				parseInt(dataForAdminOut.length / (end - start)) + 1
			);
	};

	useEffect(retrieveTaskApproversThatShareAdminUnitID, []);

	useEffect(calculateTotalPaginationPages, [
		user,
		dataForAdminIn,
		dataForAdminOut,
		start,
		end
	]);

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

	// END OF FUNCTIONS FOR ADMIN VIEW PAGINATION LOGIC --Tony | Line 70 to 141

	if (user?.role?.kind === "USER") {
		return (
			<>
				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)}>
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
						<UserSettings settings={user} />
					</TabPanel>
				</TabContext>
				{/* <Doughnut data={donutData} /> */}
			</>
		);
	}
	if (user?.role?.kind?.includes("ADMIN")) {
		return (
			<>
				{/* <Doughnut data={donutData} />; */}
				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)}>
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
						<Tab label="User Settings" value="3" />
						<Tab label="Modify Admins" value="4" />
					</TabList>

					<TabPanel value="1">
						<p>
							Displaying {dataForAdminIn.slice(start, end).length} of{" "}
							{dataForAdminIn.length} Inprocessing Tasks.
						</p>
						Page:{" "}
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
									approverList={adminTaskApprovers}
									kind={"IN_PROCESSING"}
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
									approverList={adminTaskApprovers}
									kind={"OUT_PROCESSING"}
								/>
							)}
						</TableContainer>
					</TabPanel>

					<TabPanel value="3">
						<UserSettings settings={user} />
					</TabPanel>

					<TabPanel value="4">
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
