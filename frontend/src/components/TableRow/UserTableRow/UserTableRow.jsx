import React, { useState } from "react";

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
	const [taskCompleted, setTaskCompleted] = useState(entry.completedAt);

	const [open, setOpen] = useState(false);

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
					<Checkbox value={taskCompleted} />
				</TableCell>
				<TableCell>{entry.title}</TableCell>
				<TableCell>{entry.description}</TableCell>
				<TableCell>{entry.approver}</TableCell>
				<TableCell>Not in Current ERD</TableCell>
				<TableCell>Not in Current ERD</TableCell>
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
