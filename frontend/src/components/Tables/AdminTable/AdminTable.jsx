import React, { useState, useEffect } from "react";

import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	IconButton
} from "@mui/material";

import { AddCircle } from "@mui/icons-material";

import AdminTableRow from "../../TableRow/AdminTableRow/AdminTableRow";

const AdminTable = ({ data, start, end, approverList }) => {
	const [adminData, setAdminData] = useState(data.slice(start, end));

	// When the Admin Table is Built
	//   make a fetch request to figure out who has the role TASK APPROVER at your BASE
	//   this set of individuals is who can be rendered to a drop down for POC name choice

	useEffect(() => {
		console.log(adminData);
	}, []);

	//HANDLE ROW NEEDS TO BE REVECTORED FOR CREATE
	const handleAddRow = () => {
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
		console.log(adminData);
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
