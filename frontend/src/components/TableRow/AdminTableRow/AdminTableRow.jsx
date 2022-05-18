// React Base Functionality
import React, { useState, useEffect, useContext } from "react";

// Our Components and Services
import { UserContext } from "#context";
import { TaskAPI, UserAPI } from "#services/api";
import styles from "./HtmlDecorator.module.css";

// Third Party Components

// MUI Components
import {
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
	MenuItem,
	Slide,
	Typography,
	Divider
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";

const DeleteDialog = ({ name, desc, id, handleDelete, theme }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAgree = () => {
		handleDelete(id);
		setOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClickOpen}>
				<IconButton
					aria-label="delete"
					data-testid={`delete-button delete-button-${id}`}
				>
					<Delete />
				</IconButton>
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="delete-dialog-description"
				sx={{ borderTopRightRadius: "6px", borderTopLeftRadius: "6px" }}
				PaperProps={{
					sx: {
						borderTopRightRadius: "6px",
						borderTopLeftRadius: "6px",
						p: 0,
						m: 0
					}
				}}
			>
				<DialogTitle
					sx={{
						textAlign: "center",
						borderTopRightRadius: "6px",
						borderTopRightLeft: "6px",
						color: theme.palette.gsb.text,
						backgroundColor: theme.palette.gsb.background
					}}
				>
					Delete Task
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<Typography variant="h4" sx={{ mt: 2, textAlign: "center" }}>
							Are you sure you want to delete this task?
						</Typography>
						<Box sx={{ mt: 2 }}>
							<Typography variant="h5">{name}</Typography>
							<Typography variant="h6">{desc}</Typography>
						</Box>
					</DialogContentText>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={handleAgree} autoFocus>
						Yes
					</Button>
					<Button onClick={handleClose}>No</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

// Start of the AdminTableRow React Hook
const AdminTableRow = ({ entry, setMessage, approverList, theme }) => {
	console.log("admintablerow", entry);
	const { user, setUser } = useContext(UserContext);

	//START of AdminTableRow State
	const [isActive, setIsActive] = useState(entry.isActive);
	const [taskTitle, setTaskTitle] = useState(entry.title);
	const [oldTitle, setOldTitle] = useState(entry.title);
	const [taskDesc, setTaskDesc] = useState(entry.description);
	const [oldDesc, setOldDesc] = useState(entry.description);
	const [taskKind, setTaskKind] = useState(entry.kind);
	const [poc, setPoc] = useState(entry?.approver);
	// END of AdminTableRow State

	var updatedAt = new Date(entry.updatedAt);

	const handleDelete = value => {
		const deleteTask = new TaskAPI();
		deleteTask
			.id(parseInt(value))
			.delete(user.token)
			.then(response => response.text())
			.then(setMessage(`Deleted Task Number ID: ${value}!`))
			.then(() => {
				const refreshUser = new UserAPI();
				refreshUser
					.email(user.email)
					.get(user.token)
					.then(response => response.json())
					.then(d => {
						let tempUser = d.data[0];
						tempUser.token = user.token;
						tempUser.credentials = user.credentials;
						setUser(tempUser);
					});
			})
			.catch(err => console.log(err));
	};

	const handlePut = stringifiedJSON => {
		const updateTask = new TaskAPI();

		updateTask.id(entry.id);
		console.log({ updateTask });
		updateTask
			.update(user.token, stringifiedJSON)
			.then(response => response.json())
			.then(result => console.log("PUT", result))
			.then(() => {
				const refreshUser = new UserAPI();
				console.log(user.token);
				refreshUser
					.email(user.email)
					.get(user.token)
					.then(response => response.json())
					.then(d => {
						let tempUser = d.data[0];
						tempUser.token = user.token;
						tempUser.credentials = user.credentials;
						setUser(tempUser);
					});
			})
			.catch(error => console.log("error", error));
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (taskTitle !== oldTitle) handlePut({ title: taskTitle });
		}, 1000);
		return () => clearTimeout(timer);
	}, [taskTitle]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (taskDesc !== oldDesc) handlePut({ description: taskDesc });
		}, 1000);
		return () => clearTimeout(timer);
	}, [taskDesc]);

	const updatePoc = e => {
		e.preventDefault();
		const newPOC = e.target.value;
		setPoc(newPOC);
		if (poc.id !== newPOC.id) {
			handlePut({
				approverID: newPOC.id
			});
		}
	};

	const updateIsActive = e => {
		e.preventDefault();
		let raw = {
			isActive: !isActive
		};
		setIsActive(!isActive);
		handlePut(raw);
	};

	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex={-1}
			sx={{
				"&.MuiTableRow-root:hover": {
					backgroundColor: theme.palette.hover.table
				}
			}}
		>
			<TableCell sx={{ p: "10px 4.5px" }}>
				<Switch
					checked={isActive}
					name="isActive"
					value={isActive}
					onChange={updateIsActive}
				/>
			</TableCell>
			<TableCell sx={{ p: "10px 4.5px" }}>
				<TextField
					size="small"
					value={taskTitle}
					sx={{ width: "30ch" }}
					onChange={e => setTaskTitle(e.target.value)}
				/>
			</TableCell>
			<TableCell sx={{ p: "10px 4.5px" }}>
				<TextField
					size="small"
					value={taskDesc}
					sx={{ width: "45ch" }}
					onChange={e => setTaskDesc(e.target.value)}
				/>
			</TableCell>
			<TableCell sx={{ p: "10px 4.5px" }}>
				<div>
					<TextField
						id="outlined-select-poc"
						select
						label="POC Name"
						value={`${poc.firstName} ${poc.lastName}`}
						onChange={updatePoc}
						sx={{ width: "40ch" }}
						helperText="Please select the POC"
					>
						{approverList.length > 0 &&
							approverList.map(approver => (
								<MenuItem key={approver.id} value={approver}>
									{approver.firstName} {approver.lastName}
								</MenuItem>
							))}
					</TextField>
				</div>
			</TableCell>
			<TableCell sx={{ p: "10px 4.5px" }}>
				<TextField
					size="small"
					value={poc.dsn}
					sx={{ width: "25ch" }}
					variant="standard"
					disabled
				/>
			</TableCell>
			<TableCell sx={{ p: "10px 4.5px" }}>
				<a
					href={`mailto:${poc.email}?subject=Regarding Task #${entry.id}: ${
						entry.title
					}&body=Task #${
						entry.id
					}, ${taskTitle}%0D%0A%0D%0A Description: ${taskDesc} %0D%0A%0D%0A Task is Active: ${isActive} %0D%0A%0D%0A Task Type: ${taskKind
						.toLowerCase()
						.replace(
							"_",
							" "
						)} %0D%0A%0D%0A ...begin Email here %0D%0A%0D%0A %0D%0A%0D%0A %0D%0A%0D%0A Regards, %0D%0A%0D%0A ${
						user.firstName
					} ${user.lastName} %0D%0A ${user.role.kind.replace(
						"_",
						" "
					)}&from={user.email}`}
					className={styles.mail}
				>
					{poc.email}
				</a>
			</TableCell>
			<TableCell sx={{ p: "10px 4.5px" }}>
				{`${
					updatedAt.getUTCMonth() + 1
				} - ${updatedAt.getUTCDate()} - ${updatedAt.getUTCFullYear()}`}
			</TableCell>

			<TableCell sx={{ p: "10px 4.5px" }}>
				<DeleteDialog
					id={entry.id}
					name={taskTitle}
					desc={taskDesc}
					handleDelete={handleDelete}
					theme={theme}
				/>
			</TableCell>
		</TableRow>
	);
};
export default AdminTableRow;
