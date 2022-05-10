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

const AdminTable = ({ data, start, end, kind, approverList }) => {
	const [adminData, setAdminData] = useState(data.slice(start, end));
	const [message, setMessage] = useState("");
	const { user, setUser } = useContext(UserContext);

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
			.then(json => setMessage(`Created Task Number ID: ${json.id}!`))
			.then(() => {
				const refreshUser = new UserAPI();
				refreshUser
					.email(user.email)
					.get()
					.then(response => response.json())
					.then(d => setUser(d.data[0]));
			})
			.catch(err => console.log(err));
	};

	return (
		<>
			<MuiTable size={"small"} id={`adminTable-${kind}`}>
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
							setMessage={setMessage}
							approverList={approverList}
						/>
					))}
				</TableBody>
			</MuiTable>

			<IconButton
				color="primary"
				size="large"
				sx={{ width: "100%" }}
				onClick={handleAddRow}
				id="addTaskButton"
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
