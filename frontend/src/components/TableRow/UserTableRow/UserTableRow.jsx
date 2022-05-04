import {
	TableRow,
	TableCell,
	Checkbox,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText
} from "@mui/material";
import { useState } from "react";
const UserTableRow = ({ entry }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
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
						entry.updated_at.getUTCMonth() + 1
					} - ${entry.updated_at.getUTCDate()} - ${entry.updated_at.getUTCFullYear()}`}
				</DialogContentText>

				<DialogActions>
					<Button onClick={handleClose}>Exit</Button>
				</DialogActions>
			</Dialog>
			<TableRow onClick={() => handleClickOpen()}>
				<TableCell>
					<Checkbox
						onChange={() => console.log(`Update Checkbox of id ${entry.id}`)}
					/>
				</TableCell>
				<TableCell>{entry.title}</TableCell>
				<TableCell>{entry.description}</TableCell>
				<TableCell>{entry.approver}</TableCell>
				<TableCell>Not in Current ERD</TableCell>
				<TableCell>Not in Current ERD</TableCell>
				<TableCell>
					{`${
						entry.updated_at.getUTCMonth() + 1
					} - ${entry.updated_at.getUTCDate()} - ${entry.updated_at.getUTCFullYear()}`}
				</TableCell>
				<TableCell>{entry.owner}</TableCell>
			</TableRow>
		</>
	);
};
export default UserTableRow;
