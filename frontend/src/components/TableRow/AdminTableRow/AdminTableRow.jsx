import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Switch,
	Button,
	TextField,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText
} from "@mui/material";

import { Delete, Star } from "@mui/icons-material";
import { useState } from "react";
import DeleteDialog from "../../Dialog/DeleteDialog/DeleteDialog";
const AdminTableRow = ({ entry }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const dialogDetails = { open, handleClose };
	return (
		<>
			<DeleteDialog dialogDetails={dialogDetails} />
			{/* <Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						More Info Coming
					</DialogContentText>
				</DialogContent>
			</Dialog> */}
			<TableRow>
				<TableCell>
					<Switch
						onChange={() =>
							console.log(`Switch has been changed id ${entry.id}`)
						}
					/>
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
					<TextField
						size="small"
						placeholder={entry.approver}
						sx={{ width: "25ch" }}
					/>
				</TableCell>
				<TableCell>
					<TextField
						size="small"
						placeholder={"Not in Current ERD"}
						sx={{ width: "25ch" }}
					/>
				</TableCell>
				<TableCell>
					<TextField
						size="small"
						placeholder={`Not in Current ERD`}
						sx={{ width: "25ch" }}
					/>
				</TableCell>
				<TableCell>
					{`${
						entry.updated_at.getUTCMonth() + 1
					} - ${entry.updated_at.getUTCDate()} - ${entry.updated_at.getUTCFullYear()}`}
				</TableCell>
				<TableCell>
					<TextField
						size="small"
						placeholder={entry.owner}
						sx={{ width: "10ch" }}
					/>
					{/* should be a drop down once able to pull all the base names */}
				</TableCell>
				<TableCell>
					<IconButton
						aria-label="info"
						onClick={() => {
							handleClickOpen();
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
							handleClickOpen();
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
