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

import { ModifyAdminRow } from "#components";

const ModifyAdminTable = ({ data }) => {
	const [adminData, setAdminData] = useState([]);

	useEffect(() => {
		setAdminData(data);
	}, []);
	//console.log(data);
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
						<TableCell>User Type</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{adminData.map(entry => (
						<ModifyAdminRow hover={true} key={entry.id} entry={entry} />
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
export default ModifyAdminTable;
