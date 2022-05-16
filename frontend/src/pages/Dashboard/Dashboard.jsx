import React, { useState, useEffect, useContext, useRef } from "react";

// Our Components and Utilities
import { PageContext, UserContext } from "#context";

import { UserAPI } from "#services";

// Third Party Components and Utilities
import { Paper, Tab, TableContainer, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	UserTable,
	AdminTable,
	UserSettings,
	ModifyAdminTable,
	Analytics,
	TaskPanel
} from "#components";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

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
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(50);
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
		console.log(user.assignedUnit);
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
						console.log({ approvers });
						setAdminTaskApprovers(approvers.data);
					}
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

	if (page === "Tasks") {
		if (
			(user?.role?.kind === "USER" && userData.length > 0) ||
			user?.role?.kind?.includes("ADMIN")
		) {
			const tasks =
				user?.role?.kind === "USER"
					? {
							inprocessing: userInData,
							outprocessing: userOutData
					  }
					: {
							inprocessing: dataForAdminIn,
							outprocessing: dataForAdminOut,
							approverList: adminTaskApprovers
					  };

			return <TaskPanel tasks={tasks} />;
		}
	} else if (page === "Analytics") {
		if (user?.role?.kind?.includes("ADMIN")) {
			return <Analytics user={user} />;
		}
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
