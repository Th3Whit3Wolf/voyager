import React, { useState, useEffect } from "react";

import {
	TableRow,
	TableCell,
	Checkbox,
	Dialog,
	DialogContent,
	DialogContentText
} from "@mui/material";

const UserTableRow = ({ entry }) => {
	// STATE for USER TASKS
	const [taskCompletedAt, setTaskCompletedAt] = useState(entry.completedAt);
	const [taskChecked, setTaskChecked] = useState(false);

	const [open, setOpen] = useState(false);

	// STATE handlers

	useEffect(() => {
		if (taskCompletedAt !== null) {
			setTaskChecked(true);
		}
	}, [taskCompletedAt]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	var updatedAt = new Date(entry.updatedAt);
	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						More Info Coming
					</DialogContentText>
				</DialogContent>
			</Dialog>
			<TableRow hover={true}>
				<TableCell>
					<Checkbox value={taskChecked} />
				</TableCell>
				<TableCell>{entry.task.title}</TableCell>
				<TableCell>{entry.task.description}</TableCell>
				<TableCell>
					{entry.task.approver.firstName} {entry.task.approver.lastName}
				</TableCell>
				<TableCell>{entry.task.approver.dsn}</TableCell>
				<TableCell>{entry.task.approver.email}</TableCell>
				<TableCell>
					{`${
						updatedAt.getUTCMonth() + 1
					} - ${updatedAt.getUTCDate()} - ${updatedAt.getUTCFullYear()}`}
				</TableCell>
				<TableCell>{entry.owner}</TableCell>
				<TableCell onClick={() => handleClickOpen()}>*</TableCell>
			</TableRow>
		</>
	);
};
export default UserTableRow;
