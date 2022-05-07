import React, { useState, useEffect, useContext } from "react";

// Our Components and Utilities
import AdminTableRow from "../../TableRow/AdminTableRow/AdminTableRow";
import { TaskAPI } from "../../../services/api/TaskAPI";
import { UserAPI } from "../../../services/api/UserAPI";
import { UserContext } from "../../../context";

// Third Party Imports
import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	IconButton
} from "@mui/material";

import { AddCircle } from "@mui/icons-material";

const AdminTable = ({ data, start, end, approverList, kind }) => {
	const [adminData, setAdminData] = useState(data.slice(start, end));
	const [postedNewTask, setPostedNewTask] = useState(0);
	const [json, setJson] = useState({});
	const [modJson, setModJson] = useState({});
	const [approvers, setApprovers] = useState({});
	const [message, setMessage] = useState("");
	const { user, setUser } = useContext(UserContext);

	// Process Flow for Re-Rendering the View Correctly After Posting New Row
	//		1. Clicking on the AddCircle button component executes handleRow function
	//		2. HandleRow function makes the post and then captures the JSON into the state
	//			I do this for further processing, but I also need certain data to for sure exist, such as the task.

	//HANDLE ROW NEEDS TO BE REVECTORED FOR CREATE
	const handleAddRow = () => {
		const addTask = new TaskAPI();

		const body = {
			title: "New Title",
			description: "New Description",
			isActive: true,
			kind: kind,
			assignerID: user.id,
			approverID: user.tasksAssigned[0].approver.id,
			unitID: user.assignedUnit.id
		};
		addTask
			.create(body)
			.then(response => response.json())
			.then(d => {
				setJson(d);
			})
			//
			// console.log(json);
			// .then(
			// 	getUserTasksAssigned
			// 		.email(`${user.email}`)
			// 		.get()
			// 		.then(response => response.json())
			// 		.then(d => console.log(d.data[0].tasksAssigned.slice(start, end)))
			// 		//.then(d => setAdminData(d.data[0].tasksAssigned))
			// 		.catch(err => console.log(err))
			// )
			.catch(err => console.log(err));
	};

	useEffect(() => {
		const defaultApprover = new UserAPI();
		console.log(json);
		if (json?.data) setMessage(`Created Task Number ID: ${json.data.id}!`);
		if (json?.data) {
			defaultApprover
				.assignedUnitID(user.assignedUnit.id)
				.roleID(6)
				.limit(100)
				.get()
				.then(response => response.json())
				.then(d => setApprovers(d.data));
		}
	}, [json, user.assignedUnit.id]);

	useEffect(() => {
		setModJson({ ...json, approver: approvers[0] });
	}, [approvers]);

	return (
		<>
			<MuiTable size={"small"}>
				<TableHead>
					<TableRow>
						<TableCell>Active Task</TableCell>
						<TableCell>Task Name</TableCell>
						<TableCell>Short Description</TableCell>
						<TableCell>POC Name</TableCell>
						<TableCell>POC Phone</TableCell>
						<TableCell>POC Email</TableCell>
						<TableCell>Last Updated</TableCell>
						<TableCell>More Info</TableCell>
						<TableCell>Delete Task</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{adminData.map((entry, idx) => (
						<AdminTableRow
							hover={true}
							key={idx}
							entry={entry}
							approverList={approverList}
						/>
					))}
				</TableBody>
			</MuiTable>

			{/* THIS NEEDS TO BE REVECTORED FOR CREATE */}
			<IconButton
				color="primary"
				size="large"
				sx={{ width: "100%" }}
				onClick={handleAddRow}
			>
				<AddCircle />
			</IconButton>

			<div>
				<h3>{message}</h3>
			</div>
		</>
	);
};
export default AdminTable;
