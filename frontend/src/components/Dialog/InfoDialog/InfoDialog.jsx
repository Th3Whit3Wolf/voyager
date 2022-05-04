import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button
} from "@mui/material";

const InfoDialog = ({ info_open, handleClose, entry }) => {
	return (
		<>
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
						entry.updated_at.getUTCMonth() + 1
					} - ${entry.updated_at.getUTCDate()} - ${entry.updated_at.getUTCFullYear()}`}
				</DialogContentText>

				<DialogActions>
					<Button onClick={handleClose}>Exit</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
export default InfoDialog;
