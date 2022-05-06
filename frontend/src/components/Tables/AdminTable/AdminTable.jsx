import React, { useState, useContext } from "react";

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
	const { user, setUser } = useContext(UserContext);

	//HANDLE ROW NEEDS TO BE REVECTORED FOR CREATE
	const handleAddRow = () => {
		const addTask = new TaskAPI();
		const newApprover = new UserAPI();

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
			.then(d =>
				newApprover
					.id(user.tasksAssigned[0].approver.id)
					.get()
					.then(response => response.json())
					.then(approver => (d.data.approver = approver.data[0]))
					.then(console.log("MADE NEW TASK", d.data))
					.then(console.log("OLD DATA", adminData))
					.then(setAdminData([...adminData, d.data]))
					.catch(err => console.log(err))
			)
			.catch(err => console.log(err));
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
		</>
	);
};
export default AdminTable;
