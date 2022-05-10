// React Base Functionality
import React, { useState, useContext } from "react";

// Our Components and Services
import { UserContext } from "../../../context";
import { TaskAPI } from "../../../services/api/TaskAPI";
import { UserAPI } from "../../../services/api/UserAPI";

// MUI Components
import {
	TableRow,
	TableCell,
	Switch,
	Button,
	TextField,
	IconButton,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
	Select,
	MenuItem
} from "@mui/material";

import { Delete, Star } from "@mui/icons-material";
import DeleteDialog from "../../Dialog/DeleteDialog/DeleteDialog";
import InfoDialog from "../../Dialog/InfoDialog/InfoDialog";

// Start of the AdminTableRow React Hook

const AdminTableRow = ({ entry, setMessage, approverList }) => {
	const { user, setUser } = useContext(UserContext);

	//START of AdminTableRow State
	const [checked, setChecked] = useState(entry.isActive);
	const [taskTitle, setTaskTitle] = useState(entry.title);
	const [taskDesc, setTaskDesc] = useState(entry.description);
	const [pocName, setPocName] = useState(
		`${entry.approver.firstName} ${entry.approver.lastName}`
	);
	const [pocID, setPocID] = useState(entry.approver.id);
	const [pocPhone, setPocPhone] = useState(`${entry.approver.dsn}`);
	const [pocEmail, setPocEmail] = useState(`${entry.approver.email}`);
	// END of AdminTableRow State

	// START of Dialog Boxes State -- see Jelani
	const [open, setOpen] = useState(false);
	const [delete_open, delete_setOpen] = useState(false);
	const [info_open, info_setOpen] = useState(false);
	// END of Dialog Boxes State

	const handleChange = event => {
		console.log(`Switch has been changed id ${entry.id}`);
		setChecked(event.target.checked);
	};

	const delete_handleClickOpen = () => {
		delete_setOpen(true);
	};

	const handleClose = () => {
		delete_setOpen(false);
		info_setOpen(false);
		setOpen(false);
	};

	const info_handleClickOpen = () => {
		info_setOpen(true);
	};
	var updatedAt = new Date(entry.updatedAt);
	//const DeleteDialogProps = { delete_open, handleClose, entry };
	//const InfoDialogProps = { info_open, handleClose, entry };

	const handleDelete = value => {
		console.log(parseInt(value));
		const deleteTask = new TaskAPI();
		deleteTask
			.delete(parseInt(value))
			.then(response => console.log(response))
			.then(setMessage(`Deleted Task Number ID: ${value}!`))
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
			{/* <DeleteDialog dialogDetails={dialogDetails} /> */}
			{/* modal for delete(trash can icon) */}
			<Dialog open={delete_open} onClose={handleClose}>
				<DialogTitle id="delete-modal">
					{`Are you sure you want to delete ${entry.title}`}
				</DialogTitle>
				<DialogContentText id="delete-dialog-description">
					You will not be able to reset this deletion
				</DialogContentText>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={info_open} onClose={handleClose}>
				<DialogTitle id="more-info-modal">{`${entry.title}`}</DialogTitle>
				<DialogContentText id="info-dialog-description-task-type">
					{`${entry.task_type}`}
				</DialogContentText>
				<DialogContentText id="info-dialog-Space">
					{
						"------------------------------------------------------------------------------------------"
					}
				</DialogContentText>
				<DialogContentText id="info-dialog-POC-Owner">
					{`POC: ${entry.approver}------Unit Owner: ${entry.owner}
					`}
					{""}
				</DialogContentText>
				<DialogContentText id="info-dialog-Space">
					{
						"------------------------------------------------------------------------------------------"
					}
				</DialogContentText>
				<DialogContentText id="info-dialog-description-">
					{`${entry.description}`}
				</DialogContentText>
				<DialogContentText id="info-dialog-Space">
					{
						"------------------------------------------------------------------------------------------"
					}
				</DialogContentText>
				<DialogContentText id="info-dialog-date">
					{`${
						updatedAt.getUTCMonth() + 1
					} - ${updatedAt.getUTCDate()} - ${updatedAt.getUTCFullYear()}`}
				</DialogContentText>

				<DialogActions>
					<Button onClick={handleClose}>Exit</Button>
				</DialogActions>
			</Dialog>
			{/* <Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						More Info Coming
					</DialogContentText>
				</DialogContent>
			</Dialog> */}
			<TableRow>
				<TableCell>
					<Switch checked={checked} onChange={handleChange} />
				</TableCell>
				<TableCell>
					<TextField
						size="small"
						value={taskTitle}
						sx={{ width: "30ch" }}
						onChange={e => setTaskTitle(e.target.value)}
					/>
				</TableCell>
				<TableCell>
					<TextField size="small" value={taskDesc} sx={{ width: "45ch" }} />
				</TableCell>
				<TableCell>
					<Select
						value={pocID}
						onChange={e => setPocID(e.target.value)}
						sx={{ width: "20ch" }}
					>
						{approverList.length > 0 &&
							approverList.map((approver, idx) => (
								<MenuItem key={idx} value={approver.id}>
									{approver.firstName} {approver.lastName}
								</MenuItem>
							))}
					</Select>
				</TableCell>
				<TableCell>
					<TextField size="small" value={pocPhone} sx={{ width: "25ch" }} />
				</TableCell>
				<TableCell>
					<TextField size="small" value={pocEmail} sx={{ width: "25ch" }} />
				</TableCell>
				<TableCell>
					{`${
						updatedAt.getUTCMonth() + 1
					} - ${updatedAt.getUTCDate()} - ${updatedAt.getUTCFullYear()}`}
				</TableCell>
				<TableCell>
					<IconButton
						aria-label="info"
						onClick={() => {
							info_handleClickOpen();
							console.log(`Info Request id ${entry.id}`);
						}}
					>
						<Star />
					</IconButton>
				</TableCell>
				<TableCell>
					<IconButton
						aria-label="delete"
						onClick={e => {
							//delete_handleClickOpen();
							handleDelete(entry.id);
						}}
					>
						<Delete />
					</IconButton>
				</TableCell>
			</TableRow>
		</>
	);
};
export default AdminTableRow;
