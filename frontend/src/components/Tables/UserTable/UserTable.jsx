import React from "react";

import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from "@mui/material";
import { UserTableRow } from "#components";

const UserTable = ({ alldata }) => {
	return (
		<>
			<MuiTable size={"small"}>
				<TableHead>
					<TableRow>
						<TableCell>Complete?</TableCell>
						<TableCell>Task Name</TableCell>
						<TableCell>Short Description</TableCell>
						<TableCell>Task Completion Date</TableCell>
						<TableCell>POC Name</TableCell>
						<TableCell>POC Phone</TableCell>
						<TableCell>POC Email</TableCell>
						<TableCell>Owner</TableCell>
						<TableCell>More Info</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{alldata.map(entry => (
						<UserTableRow hover={true} key={entry.id} entry={entry} />
					))}
				</TableBody>
			</MuiTable>
		</>
	);
};
export default UserTable;
