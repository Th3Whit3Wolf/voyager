import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Switch,
	Button
} from "@mui/material";

const AdminTable = ({ data }) => {
	return (
		<>
			<MuiTable size={"small"}>
				<TableHead>
					<TableRow>
						<TableCell>Active Task</TableCell>
						<TableCell>Task Name</TableCell>
						<TableCell>Short Description</TableCell>
						<TableCell>POC Name</TableCell>
						<TableCell>POC Phone</TableCell>
						<TableCell>POC Email</TableCell>
						<TableCell>Last Updated</TableCell>
						<TableCell>Owner</TableCell>
						<TableCell>Delete Task</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(entry => (
						<TableRow hover={true} key={entry.id}>
							<TableCell>
								<Switch
									onChange={() =>
										console.log(`Switch has been changed id ${entry.id}`)
									}
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
							<TableCell>
								<Button
									onClick={() => console.log(`Item Deleted id ${entry.id}`)}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</MuiTable>
		</>
	);
};
export default AdminTable;
