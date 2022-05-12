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
	const [taskCompletedAt, setTaskCompletedAt] = useState(
		entry.completedAt === null ? false : new Date(entry.completedAt)
	);
	const [taskChecked, setTaskChecked] = useState(
		entry.completedAt === null ? false : true
	);
	const [taskUpdated, setTaskUpdated] = useState(new Date(entry.updatedAt));

	const [open, setOpen] = useState(false);

	// STATE handlers

	////////

	//git commit -m "feat: my new thing
	//
	//Co-authored-by: whitneyhessler14 <whitneyhessler14@users.noreply.github.com>"
	/////

	const handleOnChange = e => {
		if (e.target.value === "false") {
			let myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			let raw = JSON.stringify({
				completedAt: new Date()
			});
			const requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw
			};
			fetch(
				`http://localhost:8081/api/v1/users/tasks/${entry.id}`,
				requestOptions
			)
				.then(response => response.json())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
			setTaskChecked(true);
			setTaskCompletedAt(new Date());
		}
		if (e.target.value === "true") {
			let myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			let raw = JSON.stringify({
				completedAt: null
			});
			const requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw
			};
			fetch(
				`http://localhost:8081/api/v1/users/tasks/${entry.id}`,
				requestOptions
			)
				.then(response => response.json())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
			setTaskChecked(false);
			setTaskCompletedAt(null);
		}
	};

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
					{entry.task.assigner.firstName} {entry.task.assigner.lastName}
				</TableCell>
				<TableCell onClick={() => handleClickOpen()}>*</TableCell>
			</TableRow>
		</>
	);
};
export default UserTableRow;
