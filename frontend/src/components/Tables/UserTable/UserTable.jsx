import React, { useState } from "react";

import { UserTableRow } from "#components";

// Third Party Imports
import {
	Box,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	TableFooter,
	IconButton,
	useTheme
} from "@mui/material";

import {
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

// Componet storing users's task data as a table
const UserTable = ({ data }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const theme = useTheme();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<TableContainer sx={{ maxHeight: "75%" }}>
				<Table stickyHeader aria-label="sticky table">
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
								Complete
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
								Due Date
							</TableCell>
							<TableCell
								sx={{
									height: "40px",
									p: "10px 9.5",
									backgroundColor: theme.palette.gsb.background,
									color: theme.palette.gsb.text
								}}
							>
								Completion Date
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
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.filter(entry => entry.task.isActive === true)
							.map(entry => (
								<UserTableRow
									hover={true}
									key={entry.id}
									entry={entry}
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
			</TableContainer>
		</>
	);
};
export default UserTable;
