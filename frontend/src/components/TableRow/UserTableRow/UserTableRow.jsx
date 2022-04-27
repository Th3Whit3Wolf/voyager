import { TableCell, Checkbox } from "@mui/material";

const UserTableRow = ({ entry }) => {
	return (
		<>
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
		</>
	);
};
export default UserTableRow;
