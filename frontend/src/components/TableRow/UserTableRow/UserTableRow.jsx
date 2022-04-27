import {
	TableRow,
	TableCell,
	Checkbox,
	Dialog,
	DialogContent,
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
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						More Info Coming
					</DialogContentText>
				</DialogContent>
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
