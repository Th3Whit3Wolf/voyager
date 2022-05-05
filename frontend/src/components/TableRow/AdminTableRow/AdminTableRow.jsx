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
	DialogContentText
} from "@mui/material";

import { Delete, Star } from "@mui/icons-material";
import { useState } from "react";
import DeleteDialog from "../../Dialog/DeleteDialog/DeleteDialog";
import InfoDialog from "../../Dialog/InfoDialog/InfoDialog";

const AdminTableRow = ({ entry }) => {
	const [open, setOpen] = useState(false);
	const [delete_open, delete_setOpen] = useState(false);
	const [info_open, info_setOpen] = useState(false);

	console.log(entry);

	//AdminTableRow State
	const [checked, setChecked] = useState(entry.isActive);
	const [pocName, setPocName] = useState(
		`${entry.approver.firstName} ${entry.approver.lastName}`
	);
	const [pocPhone, setPocPhone] = useState(`${entry.approver.dsn}`);
	const [pocEmail, setPocEmail] = useState(`${entry.approver.email}`);

	const handleChange = event => {
		console.log(`Switch has been changed id ${entry.id}`);
		setChecked(event.target.checked);
	};
	//end of switch code
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
						placeholder={entry.title}
						sx={{ width: "20ch" }}
					/>
				</TableCell>
				<TableCell>
					<TextField
						size="small"
						value={entry.description}
						sx={{ width: "45ch" }}
					/>
				</TableCell>
				<TableCell>
					<TextField size="small" value={pocName} sx={{ width: "25ch" }} />
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
						onClick={() => {
							delete_handleClickOpen();
							console.log(`Item Deleted id ${entry.id}`);
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
