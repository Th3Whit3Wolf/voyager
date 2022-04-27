import {
	TableRow,
	TableCell,
	Checkbox,
	Dialog,
	DialogContent,
	DialogContentText
} from "@mui/material";

const UserTableRow = ({ entry }) => {
	var modalDisplay = false;
	function OnOffModal() {
		if (modalDisplay && true) modalDisplay = false;
		else modalDisplay = true;
	}

	return (
		<>
			<Dialog open={modalDisplay}>
				<DialogContent open={modalDisplay} onBackdropClick={() => OnOffModal()}>
					<DialogContentText id="alert-dialog-description">
						Let Google help apps determine location. This means sending
						anonymous location data to Google, even when no apps are running.
					</DialogContentText>
				</DialogContent>
			</Dialog>
			<TableRow onClick={() => OnOffModal()}>
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
