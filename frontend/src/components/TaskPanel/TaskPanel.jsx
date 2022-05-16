import React, { useState, useEffect, useContext, useRef } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	Paper,
	Tab,
	TableContainer,
	TableHead,
	Table,
	Button,
	TableRow,
	TableCell,
	TablePagination,
	TableFooter,
	TableBody,
	Checkbox,
	Dialog,
	DialogContent,
	DialogContentText,
	TextField,
	Select,
	IconButton,
	useTheme,
	Box,
	Switch,
	MenuItem,
	Toolbar
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";

import { TaskUserAPI } from "#services/api";
import { UserContext } from "#context";
import { TaskAPI, UserAPI } from "#services/api";
import {
	UserTable,
	AdminTable,
	UserSettings,
	ModifyAdminTable,
	Analytics
} from "#components";

/*
const objPropertyReducer = (obj, arr) => {
	if (arr.length > 0) {
		let newObj = arr.shift();
		return objPropertyReducer(newObj, arr);
	} else {
		return obj;
	}
};
*/

const usersTableCollumns = [
	{
		id: "complete",
		label: "Complete",
		minWidth: 50,
		align: "left"
	},
	{
		id: "name",
		label: "Task",
		minWidth: 100,
		align: "left"
	},
	{
		id: "completionDate",
		label: "Completion Date",
		minWidth: 125,
		align: "center",
		format: completionDate =>
			completionDate !== false
				? completionDate.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
						timeZone: "GMT"
				  })
				: null
	},
	{
		id: "pocName",
		label: "POC Name",
		minWidth: 170,
		align: "left"
	},

	{
		id: "pocDSN",
		label: "POC DSN",
		minWidth: 170,
		align: "left"
	},

	{
		id: "pocEmail",
		label: "POC Email",
		minWidth: 170,
		align: "left"
	}
];

const adminsTableCollumns = [
	{
		id: "active",
		label: "Active Task",
		minWidth: 50,
		align: "left"
	},
	{
		id: "name",
		label: "Task",
		minWidth: 100,
		align: "left"
	},
	{
		id: "description",
		label: "Description",
		minWidth: 100,
		align: "left"
	},

	{
		id: "pocName",
		label: "POC Name",
		minWidth: 170,
		align: "left"
	},

	{
		id: "pocDSN",
		label: "POC DSN",
		minWidth: 170,
		align: "left"
	},

	{
		id: "pocEmail",
		label: "POC Email",
		minWidth: 170,
		align: "left"
	},
	{
		id: "updatedAt",
		label: "Last Updated",
		minWidth: 125,
		align: "center",
		format: completionDate =>
			completionDate.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				timeZone: "GMT"
			})
	},
	{
		id: "delTask",
		label: "Delete Task",
		minWidth: 30,
		align: "right"
	}
];

const usersData = tasks => {
	return tasks
		.filter(task => task.task.isActive)
		.map(task => {
			const { completedAt, task: tasker } = task;
			const { title: name, description, approver, assigner } = tasker;
			const { firstName, lastName, dsn: pocDSN, email: pocEmail } = approver;
			const formattedTask = {
				name,
				pocName: `${firstName} ${lastName}`,
				pocDSN,
				pocEmail
			};

			if (completedAt === null) {
				formattedTask.complete = false;
			} else {
				formattedTask.complete = true;
				formattedTask.completionDate = new Date(completedAt);
			}

			return formattedTask;
		});
};

const adminsData = tasks => {
	return tasks.map(task => {
		const {
			id: taskID,
			updatedAt,
			isActive,
			kind,
			title: name,
			description,
			approver
		} = task;
		const {
			id: idPOC,
			firstName,
			lastName,
			dsn: pocDSN,
			email: pocEmail
		} = approver;

		return {
			taskID,
			active: isActive,
			name,
			description,
			kind,
			idPOC,
			pocName: `${firstName} ${lastName}`,
			pocDSN,
			pocEmail,
			updatedAt
		};
	});
};

const UserRow = ({ task, theme }) => {
	const { user } = useContext(UserContext);
	const { name, completedAt, completionDate, pocName, pocDSN, pocEmail } = task;
	const [taskCompletedAt, setTaskCompletedAt] = useState(
		completionDate === undefined ? false : completionDate
	);
	const [taskChecked, setTaskChecked] = useState(completedAt);
	const handleOnChange = e => {
		if (e.target.value === "false" || e.target.value === "true") {
			const updateUserTask = new TaskUserAPI();
			updateUserTask
				.id(task.id)
				.update(user.token, {
					completedAt: e.target.value === "false" ? new Date() : null
				})
				.then(response => response.json())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
			setTaskChecked(true);
			setTaskCompletedAt(new Date());
		}
	};
	let row = {
		complete: (
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
		),
		name,
		completionDate: taskCompletedAt,
		pocName,
		pocDSN,
		pocEmail
	};
	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex={-1}
			key={row.name}
			sx={{
				"&.MuiTableRow-root:hover": {
					backgroundColor: theme.palette.hover.table
				}
			}}
		>
			{usersTableCollumns.map(column => {
				const value = row[column.id];
				return (
					<TableCell
						key={column.id}
						align={column.align}
						sx={{ p: "10px 4.5px" }}
					>
						{column.format ? column.format(value) : value}
					</TableCell>
				);
			})}
		</TableRow>
	);
};

const AdminRow = ({ task, approverList, setMessage, theme }) => {
	const { user, setUser } = useContext(UserContext);

	const {
		taskID,
		active,
		name,
		description,
		kind,
		idPOC,
		pocName: namePOC,
		pocDSN,
		pocEmail: emailPOC,
		updatedAt
	} = task;

	//START of AdminTableRow State
	const [isActive, setIsActive] = useState(active);
	const [taskTitle, setTaskTitle] = useState(name);
	const [oldTitle, setOldTitle] = useState(name);
	const [taskDesc, setTaskDesc] = useState(description);
	const [oldDesc, setOldDesc] = useState(description);
	const [pocName, setPocName] = useState(namePOC);
	const [taskKind, setTaskKind] = useState(kind);
	const [pocID, setPocID] = useState(idPOC);
	const [pocPhone, setPocPhone] = useState(pocDSN);
	const [pocEmail, setPocEmail] = useState(emailPOC);
	// END of AdminTableRow State

	// START of Dialog Boxes State -- see Jelani
	const [open, setOpen] = useState(false);
	const [delete_open, delete_setOpen] = useState(false);
	const [info_open, info_setOpen] = useState(false);
	// END of Dialog Boxes State

	const handleChange = event => {
		console.log(`Switch has been changed id ${taskID}`);
		setIsActive(event.target.vlue);
	};

	const delete_handleClickOpen = () => {
		delete_setOpen(true);
	};

	const handleClose = () => {
		delete_setOpen(false);
		info_setOpen(false);
		setOpen(false);
	};

	const info_handleClickOpen = () => {
		info_setOpen(true);
	};

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

		updateTask.id(taskID);
		//console.log({ updateTask });
		updateTask
			.update(user.token, stringifiedJSON)
			.then(response => response.json())
			.then(result => console.log("PUT", result))
			.then(() => {
				const refreshUser = new UserAPI();
				//console.log(user.token);
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
			if (taskTitle !== oldTitle)
				handlePut(JSON.stringify({ title: taskTitle }));
		}, 1000);
		return () => clearTimeout(timer);
	}, [taskTitle]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (taskDesc !== oldDesc)
				handlePut(JSON.stringify({ description: taskDesc }));
		}, 1000);
		return () => clearTimeout(timer);
	}, [taskDesc]);

	const updatePocID = e => {
		setPocID(parseInt(e.target.value));
		let raw = {
			approverID: e.target.value
		};
		handlePut(raw);
	};

	const updateIsActive = e => {
		let raw = {
			isActive: !isActive
		};
		setIsActive(!isActive);
		handlePut(raw);
	};

	let row = {
		active: (
			<Switch
				checked={isActive}
				name="isActive"
				value={isActive}
				onChange={updateIsActive}
			/>
		),
		name: (
			<TextField
				size="small"
				value={taskTitle}
				sx={{ width: "30ch" }}
				onChange={e => setTaskTitle(e.target.value)}
			/>
		),
		description: (
			<TextField
				size="small"
				value={taskDesc}
				sx={{ width: "45ch" }}
				onChange={e => setTaskDesc(e.target.value)}
			/>
		),
		pocName: (
			<Select
				value={pocID}
				onChange={updatePocID}
				sx={{ width: "20ch" }}
				name="pocID"
			>
				{approverList.length > 0 &&
					approverList.map((approver, idx) => (
						<MenuItem key={idx} value={approver.id}>
							{approver.firstName} {approver.lastName}
						</MenuItem>
					))}
			</Select>
		),
		pocDSN: <TextField size="small" value={pocPhone} sx={{ width: "25ch" }} />,
		pocEmail: (
			<TextField size="small" value={pocEmail} sx={{ width: "25ch" }} />
		),
		updatedAt: new Date(updatedAt),
		delTask: (
			<IconButton
				aria-label="info"
				onClick={() => {
					info_handleClickOpen();
					console.log(`Info Request id ${taskID}`);
				}}
			>
				<DeleteIcon />
			</IconButton>
		)
	};
	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex={-1}
			key={row.name}
			sx={{
				"&.MuiTableRow-root:hover": {
					backgroundColor: theme.palette.hover.table
				}
			}}
		>
			{adminsTableCollumns.map(column => {
				const value = row[column.id];
				return (
					<TableCell
						key={column.id}
						align={column.align}
						sx={{ p: "10px 4.5px" }}
					>
						{column.format ? column.format(value) : value}
					</TableCell>
				);
			})}
		</TableRow>
	);
};

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
	const theme = useTheme();
	const handleFirstPageButtonClick = event => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = event => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = event => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = event => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
};

const UserTaskTable = ({ data, theme }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "6px" }}>
			<TableContainer sx={{ maxHeight: "75%" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						{usersTableCollumns.map(column => (
							<TableCell
								key={column.id}
								align={column.align}
								sx={{
									minWidth: column.minWidth,
									height: "40px",
									p: "10px 9.5",
									backgroundColor: theme.palette.gsb.background,
									color: theme.palette.gsb.text
								}}
							>
								{column.label}
							</TableCell>
						))}
					</TableHead>
					{data
						.map((task, idx) => (
							<UserRow task={task} theme={theme} key={`UserRow-${idx}`} />
						))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
					colSpan={3}
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					SelectProps={{
						inputProps: {
							"aria-label": "rows per page"
						},
						native: true
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			</TableContainer>
		</Paper>
	);
};

const AdminTaskTable = ({ data, kind, approverList, theme }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [message, setMessage] = useState("");
	const { user, setUser } = useContext(UserContext);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleAddRow = () => {
		const addTask = new TaskAPI();

		const body = {
			title: "New Title",
			description: "New Description",
			isActive: true,
			kind: kind,
			assignerID: user.id,
			approverID: user.tasksAssigned[0].approver.id,
			unitID: user.assignedUnit.id
		};
		addTask
			.create(user.token, body)
			.then(response => response.json())
			.then(json => {
				//console.log(json);
				setMessage(`Created Task Number ID: ${json.data.taskID}!`);
			})
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

	return (
		<Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "6px" }}>
			<TableContainer sx={{ maxHeight: "75%" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						{adminsTableCollumns.map(column => (
							<TableCell
								key={column.id}
								align={column.align}
								sx={{
									height: "40px",
									p: "10px 9.5",
									minWidth: column.minWidth,
									backgroundColor: theme.palette.gsb.background,
									color: theme.palette.gsb.text
								}}
							>
								{column.label}
							</TableCell>
						))}
					</TableHead>
					<TableBody>
						{data
							.map((task, idx) => (
								<AdminRow
									task={task}
									approverList={approverList}
									setMessage={setMessage}
									theme={theme}
									key={`AdminRow-${idx}`}
								/>
							))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
					colSpan={3}
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					SelectProps={{
						inputProps: {
							"aria-label": "rows per page"
						},
						native: true
					}}
					sx={{ display: "flex", alignContent: "right", alignItems: "right" }}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			</TableContainer>
			<IconButton
				color="primary"
				size="large"
				sx={{ width: "100%" }}
				onClick={handleAddRow}
				id="addTaskButton"
				data-testid="addTaskButton"
			>
				<AddCircleIcon />
			</IconButton>

			<div>
				<h3>{message}</h3>
			</div>
		</Paper>
	);
};

const TasksPanel = ({ tasks }) => {
	const [tabValue, setTabValue] = useState("1");
	const theme = useTheme();

	console.log("TaskPanel tasks", tasks);

	//console.log("THEME: ", theme);

	let hasInProcessing = tasks?.inprocessing.length > 0;
	let hasOutProcessing = tasks?.outprocessing.length > 0;
	let isAdmin =
		tasks?.approverList !== undefined && tasks?.approverList.length > 0;
	if ((hasInProcessing && hasOutProcessing) || isAdmin) {
		return (
			<>
				<Toolbar />
				<TabContext value={tabValue}>
					<TabList onChange={(e, nv) => setTabValue(nv)} sx={{ ml: 4 }}>
						{tasks.inprocessing !== undefined ? (
							<Tab
								label="Inprocessing Tasks"
								value="1"
								data-testid="buttonInprocessingTasks"
							/>
						) : (
							""
						)}
						{tasks.outprocessing !== undefined ? (
							<Tab
								label="Outprocessing Tasks"
								value="2"
								data-testid="buttonOutprocessingTasks"
							/>
						) : (
							""
						)}
					</TabList>
					<TabPanel value="1">
						{isAdmin ? (
							<AdminTaskTable
								data={adminsData(tasks.inprocessing)}
								approverList={tasks.approverList}
								kind="IN_PROCESSING"
								theme={theme}
							/>
						) : (
							<UserTaskTable
								data={usersData(tasks.inprocessing)}
								theme={theme}
							/>
						)}
					</TabPanel>
					<TabPanel value="2">
						{isAdmin ? (
							<AdminTaskTable
								data={adminsData(tasks.outprocessing)}
								approverList={tasks.approverList}
								kind="OUT_PROCESSING"
								theme={theme}
							/>
						) : (
							<UserTaskTable
								data={usersData(tasks.outprocessing)}
								theme={theme}
							/>
						)}
					</TabPanel>
				</TabContext>
			</>
		);
	} else if (hasInProcessing) {
		return (
			<>
				<Toolbar />
				<UserTaskTable
					data={usersData(tasks.inprocessing)}
					theme={theme}
					data-testid="buttonInprocessingTasks"
				/>
			</>
		);
	} else if (hasOutProcessing) {
		return (
			<>
				<Toolbar />
				<UserTaskTable
					data={usersData(tasks.outprocessing)}
					theme={theme}
					data-testid="buttonOutprocessingTasks"
				/>
			</>
		);
	} else {
		return <h2>There are no tasks</h2>;
	}
};

export default TasksPanel;
