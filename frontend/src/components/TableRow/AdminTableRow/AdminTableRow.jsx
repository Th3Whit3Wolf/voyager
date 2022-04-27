import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Switch,
	Button,
	TextField,
	IconButton
} from "@mui/material";

import { Delete } from "@mui/icons-material";

const AdminTableRow = ({ entry }) => {
	return (
		<TableRow>
			<TableCell>
				<Switch
					onChange={() => console.log(`Switch has been changed id ${entry.id}`)}
				/>
			</TableCell>
			<TableCell>
				<TextField placeholder={entry.title} sx={{ width: "20ch" }} />
			</TableCell>
			<TableCell>
				<TextField value={entry.description} sx={{ width: "45ch" }} />
			</TableCell>
			<TableCell>
				<TextField placeholder={entry.approver} sx={{ width: "25ch" }} />
			</TableCell>
			<TableCell>
				<TextField placeholder={"Not in Current ERD"} sx={{ width: "25ch" }} />
			</TableCell>
			<TableCell>
				<TextField placeholder={`Not in Current ERD`} sx={{ width: "25ch" }} />
			</TableCell>
			<TableCell>
				{`${
					entry.updated_at.getUTCMonth() + 1
				} - ${entry.updated_at.getUTCDate()} - ${entry.updated_at.getUTCFullYear()}`}
			</TableCell>
			<TableCell>
				<TextField placeholder={entry.owner} sx={{ width: "10ch" }} />
				{/* should be a drop down once able to pull all the base names */}
			</TableCell>
			<TableCell>
				<IconButton
					aria-label="delete"
					onClick={() => console.log(`Item Deleted id ${entry.id}`)}
				>
					<Delete />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};
export default AdminTableRow;
