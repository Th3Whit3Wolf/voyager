import React, { useState, useEffect, useContext } from "react";

// Our Components and Utilities
import { AdminTableRow } from "#components";
import { TaskAPI, UserAPI } from "#services/api";
import { UserContext } from "#context";

// Third Party Imports
import {
	Box,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	TablePagination,
	IconButton,
	useTheme
} from "@mui/material";

import {
	AddCircle,
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage
} from "@mui/icons-material";

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
				{theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
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
				{theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
			</IconButton>
		</Box>
	);
};

const AdminTable = ({ data, kind, approverList }) => {
	console.log("Data (ADMIN TABLE): ", data);
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	// const [adminData, setAdminData] = useState(
	// 	data.slice(rowsPerPage * page, page * rowsPerPage + rowsPerPage)
	// );
	const [message, setMessage] = useState("");
	const { user, setUser } = useContext(UserContext);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		// setAdminData(
		// 	data.slice(rowsPerPage * page, page * rowsPerPage + rowsPerPage)
		// );
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		// setAdminData(rowsPerPage);
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
			approverID: approverList[0].id,
			unitID: user.assignedUnit.id
		};
		addTask
			.create(user.token, body)
			.then(response => response.json())
			.then(json => {
				console.log(json);
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
		<TableContainer sx={{ maxHeight: "75%" }}>
			<Table stickyHeader aria-label="sticky table" id={`adminTable-${kind}`}>
				<TableHead>
					<TableRow>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							Active Task
						</TableCell>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							Task
						</TableCell>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							Description
						</TableCell>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							POC Name
						</TableCell>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							POC Phone
						</TableCell>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							POC Email
						</TableCell>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							Last Updated
						</TableCell>
						<TableCell
							sx={{
								height: "40px",
								p: "10px 9.5",
								backgroundColor: theme.palette.gsb.background,
								color: theme.palette.gsb.text
							}}
						>
							Delete Task
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data
						.map((entry, idx) => (
							<AdminTableRow
								hover={true}
								key={idx}
								entry={entry}
								setMessage={setMessage}
								approverList={approverList}
								theme={theme}
							/>
						))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
				</TableBody>
				<TableFooter>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
						colSpan={8}
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						SelectProps={{
							inputProps: {
								"aria-label": "rows per page"
							},
							native: true
						}}
						sx={{
							width: "100%"
						}}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/>
				</TableFooter>
			</Table>

			<IconButton
				color="primary"
				size="large"
				sx={{ width: "100%" }}
				onClick={handleAddRow}
				id="addTaskButton"
				data-testid="addTaskButton"
			>
				<AddCircle />
			</IconButton>

			<div>
				<h3>{message}</h3>
			</div>
		</TableContainer>
	);
};
export default AdminTable;
