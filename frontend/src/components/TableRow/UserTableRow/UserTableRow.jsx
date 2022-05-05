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
	const [taskCompletedAt, setTaskCompletedAt] = useState(null);
	const [taskChecked, setTaskChecked] = useState(false);
	const [taskUpdated, setTaskUpdated] = useState(new Date(entry.updatedAt));

	const [open, setOpen] = useState(false);

	// STATE handlers

	useEffect(() => {
		if (entry.completedAt !== null) {
			setTaskCompletedAt(new Date(entry.completedAt));
			setTaskChecked(true);
		}
	}, []);

	const handleOnChange = e => {
		if (e.target.value === "false") {
			console.log("PUT request now!");
			console.log(`Updating task ${entry.id} with ${new Date()}`);
			setTaskChecked(true);
		}
		if (e.target.value === "true") {
			console.log("PUT request now!");
			console.log(`Updating task ${entry.id} with null`);
			setTaskChecked(false);
		}
	};

	useEffect(() => {
		if (taskChecked === true) setTaskCompletedAt(new Date());
		if (taskChecked === false) setTaskCompletedAt(null);
	}, [taskChecked]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

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
					<Checkbox
						value={taskChecked}
						sx={!taskChecked ? { color: "red" } : null}
						onChange={handleOnChange}
						checked={taskChecked}
					/>
				</TableCell>
				<TableCell>{entry.task.title}</TableCell>
				<TableCell>{entry.task.description}</TableCell>
				<TableCell>
					<div>
						{taskCompletedAt
							? `${
									taskCompletedAt.getUTCMonth() + 1
							  } - ${taskCompletedAt.getUTCDate()} - ${taskCompletedAt.getUTCFullYear()}`
							: null}
					</div>
					<div>
						{taskCompletedAt
							? `${taskCompletedAt.getHours()}:${taskCompletedAt.getMinutes()}`
							: null}
					</div>
				</TableCell>
				<TableCell>
					{entry.task.approver.firstName} {entry.task.approver.lastName}
				</TableCell>
				<TableCell>{entry.task.approver.dsn}</TableCell>
				<TableCell>{entry.task.approver.email}</TableCell>
				<TableCell>
					{taskUpdated
						? `${
								taskUpdated.getUTCMonth() + 1
						  } - ${taskUpdated.getUTCDate()} - ${taskUpdated.getUTCFullYear()}`
						: null}
				</TableCell>
				<TableCell>
					{entry.task.assigner.firstName} {entry.task.assigner.lastName}
				</TableCell>
				<TableCell onClick={() => handleClickOpen()}>*</TableCell>
			</TableRow>
		</>
	);
};
export default UserTableRow;
