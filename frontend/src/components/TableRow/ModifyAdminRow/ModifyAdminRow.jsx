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
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from "@mui/material";

import { useState } from "react";

const ModifyAdminRow = ({ entry }) => {
	const [open, setOpen] = useState(false);
	const [delete_open, delete_setOpen] = useState(false);
	const [info_open, info_setOpen] = useState(false);
	const delete_handleClickOpen = () => {
		delete_setOpen(true);
	};

	return (
		<>
			<TableRow>
				<TableCell>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Admin Level</InputLabel>
						<Select
							labelId="admin-level"
							label="Admin Level"
							//onChange={handleChange}
						>
							<MenuItem value={1}>Command</MenuItem>
							<MenuItem value={2}>Delta</MenuItem>
							<MenuItem value={3}>Squadron</MenuItem>
							<MenuItem value={4}>Site</MenuItem>
							<MenuItem value={5}>Instillation</MenuItem>
						</Select>
					</FormControl>
				</TableCell>
				<TableCell>Full Name</TableCell>
				<TableCell>Phone Number</TableCell>
				<TableCell>Email</TableCell>
			</TableRow>
		</>
	);
};
export default ModifyAdminRow;
