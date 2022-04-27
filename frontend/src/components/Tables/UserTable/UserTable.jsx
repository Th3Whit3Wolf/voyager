import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Checkbox
} from "@mui/material";
import UserTableRow from "../../TableRow/UserTableRow/UserTableRow";

const UserTable = ({ data }) => {
	return (
		<>
			<MuiTable size={"small"}>
				<TableHead>
					<TableRow>
						<TableCell>Checkbox</TableCell>
						<TableCell>Task Name</TableCell>
						<TableCell>Short Description</TableCell>
						<TableCell>POC Name</TableCell>
						<TableCell>POC Phone</TableCell>
						<TableCell>POC Email</TableCell>
						<TableCell>Last Updated</TableCell>
						<TableCell>Owner</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(entry => (
						<UserTableRow key={entry.id} entry={entry} />
					))}
				</TableBody>
			</MuiTable>
		</>
	);
};
export default UserTable;
