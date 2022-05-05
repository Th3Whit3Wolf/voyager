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

const AdminTable = ({ data, start, end }) => {
	const [adminData, setAdminData] = useState([]);

	useEffect(() => {
		setAdminData(data.slice(start, end));
	}, []);

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
						<AdminTableRow hover={true} key={entry.id} entry={entry} />
					))}
				</TableBody>
			</MuiTable>
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
