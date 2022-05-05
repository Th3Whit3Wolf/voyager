import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button
} from "@mui/material";

const DeleteDialog = ({ delete_open, handleClose, entry }) => {
	return (
		<>
			{/* <DeleteDialog dialogDetails={dialogDetails} /> */}
			{/* modal for delete(trash can icon) */}
			<Dialog open={delete_open} onClose={handleClose}>
				<DialogTitle id="delete-modal">
					{`Are you sure you want to delete ${entry.title}`}
				</DialogTitle>
				<DialogContentText id="delete-dialog-description">
					You will not be able to reset this deletion
				</DialogContentText>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DeleteDialog;
