import React, { useState, useContext } from "react";

// Our Components and Utilities
import AdminTableRow from "../../TableRow/AdminTableRow/AdminTableRow";
import { TaskAPI } from "../../../services/api/TaskAPI";
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

const AdminTable = ({ data, start, end, approverList }) => {
	const [adminData, setAdminData] = useState(data.slice(start, end));
	const { user, setUser } = useContext(UserContext);
	console.log(user);
	console.log(adminData);

	//HANDLE ROW NEEDS TO BE REVECTORED FOR CREATE
	const handleAddRow = () => {
		const addTask = new TaskAPI();
		const body = {
			title: "New Title",
			description: "New Description",
			isActive: true,
			kind: "IN_PROCESSING",
			assignerID: user.id,
			approverID: user.tasksAssigned[0].approver.id,
			unitID: user.assignedUnit.id
		};
		addTask
			.create(body)
			.then(response => response.json())
			.then(d => console.log(d));

		setAdminData([
			...adminData,
			{
				id: adminData.length + 1,
				title: "Task Title",
				description: "Task Description",
				task_type: "Outprocessing",
				approver: "Task Approver",
				createdAt: new Date(),
				updatedAt: new Date(),
				owner: "Owner",
				checked: false
			}
		]);
	};

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
					{adminData.map(entry => (
						<AdminTableRow
							hover={true}
							key={entry.id}
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
		</>
	);
};
export default AdminTable;
