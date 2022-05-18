import React, { useState, useEffect, useContext, forwardRef } from "react";

import { TaskUserAPI } from "#services/api";
import { UserContext } from "#context";
import {
	TableRow,
	TableCell,
	Checkbox,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	Button,
	DialogTitle,
	Slide,
	Typography,
	Box
} from "@mui/material";

import { Info } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const MoreInfoDialog = ({
	id,
	img,
	pocName,
	pocDSN,
	pocEmail,
	assignedOfficeSymbol,
	assignedUnit,
	title,
	description,
	theme
}) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button onClick={handleClickOpen}>
				<IconButton
					aria-label="info"
					data-testid={`info-button dialog-button-${id}`}
				>
					<Info sx={{ color: theme.palette.gsb.primary, border: "none" }} />
				</IconButton>
				{title}
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
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
					{title}
				</DialogTitle>
				<DialogContent sx={{ m: 0, pl: 0, pb: 0 }}>
					<Grid container>
						<Grid item sx={{ m: 0, p: 0 }}>
							<Box
								component="img"
								sx={{
									m: 0,
									minWidth: "128px",
									minHeight: "170px",
									p: "1rem"
								}}
								alt={`${assignedUnit?.name} patch`}
								src={
									import.meta.env.PROD
										? `https://dashboard.heroku.com/apps/bsdi1-voyager-backend${img}`
										: `http://localhost:8081${img}`
								}
							/>
						</Grid>
						<Grid item>
							<Box lineHeight={1}>
								<Typography variant="h5" sx={{ mt: 2 }}>
									Description:
								</Typography>
								{description}
								<br />
								<Typography variant="h5" sx={{ mt: 1 }}>
									POC:
								</Typography>
								{pocName}
								<br />
								{`Unit: ${
									assignedUnit.abbrev !== null
										? assignedUnit.abbrev
										: assignedUnit.name
								}/${assignedOfficeSymbol}`}
								<br />
								{`DSN: ${pocDSN}`}
								<br />
								{`Email: ${pocEmail}`}
							</Box>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</div>
	);
};

const UserTableRow = ({ entry, theme }) => {
	const { user, setUser } = useContext(UserContext);
	// STATE for USER TASKS
	const [taskCompletedAt, setTaskCompletedAt] = useState(
		entry.completedAt === null ? false : new Date(entry.completedAt)
	);
	const [taskChecked, setTaskChecked] = useState(
		entry.completedAt === null ? false : true
	);
	const [taskUpdated, setTaskUpdated] = useState(new Date(entry.updatedAt));
	console.log("TASK", entry);
	const handleOnChange = e => {
		if (e.target.value === "false" || e.target.value === "true") {
			const updateUserTask = new TaskUserAPI();
			updateUserTask
				.id(entry.id)
				.update(user.token, {
					completedAt: e.target.value === "false" ? new Date() : null
				})
				.then(response => response.json())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
			setTaskChecked(!taskChecked);
			if (e.target.value === "false") setTaskCompletedAt(new Date());
			else setTaskCompletedAt(null);
		}
	};

	return (
		<>
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
					<Checkbox
						value={taskChecked}
						onChange={handleOnChange}
						checked={taskChecked}
						sx={{
							"&.Mui-checked": {
								color: theme.palette.gsb.background,
								backgroundColor: theme.palette.gsb.primary,
								ml: "12px",
								mt: "14px",
								mb: "12px",
								p: 0,
								width: 17,
								height: 16
							}
						}}
					/>
				</TableCell>
				<TableCell sx={{ p: "10px 4.5px" }}>
					<MoreInfoDialog
						id={entry.id}
						img={entry?.task?.approver?.assignedUnit?.img}
						pocName={`${entry?.task?.approver?.firstName} ${entry?.task?.approver?.lastName}`}
						pocDSN={entry?.task?.approver?.dsn}
						pocEmail={entry?.task?.approver?.email}
						assignedOfficeSymbol={entry?.task?.approver?.assignedOfficeSymbol}
						assignedUnit={entry?.task?.approver?.assignedUnit}
						title={entry?.task?.title}
						description={entry?.task?.description}
						theme={theme}
					/>
				</TableCell>
				<TableCell sx={{ p: "10px 4.5px" }}>
					{taskCompletedAt
						? taskCompletedAt.toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								timeZone: "GMT"
						  })
						: null}
				</TableCell>
				<TableCell sx={{ p: "10px 4.5px" }}>
					{entry?.dueDate
						? new Date(entry?.dueDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								timeZone: "GMT"
						  })
						: null}
				</TableCell>
				<TableCell sx={{ p: "10px 4.5px" }}>
					{entry?.task?.approver?.firstName} {entry?.task?.approver?.lastName}
				</TableCell>
				<TableCell sx={{ p: "10px 4.5px" }}>
					{entry?.task?.approver?.dsn}
				</TableCell>
				<TableCell sx={{ p: "10px 4.5px" }}>
					{entry?.task?.approver?.email}
				</TableCell>
			</TableRow>
		</>
	);
};
export default UserTableRow;
