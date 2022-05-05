import React, { useState } from "react";

import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from "@mui/material";
import UserTableRow from "../../TableRow/UserTableRow/UserTableRow";

const UserTable = ({ alldata }) => {
	const [data, setData] = useState();

	console.log(alldata);

	return (
		<>
			<MuiTable size={"small"}>
				<TableHead>
					<TableRow>
						<TableCell>Checkbox</TableCell>
						<TableCell>Task Name</TableCell>
						<TableCell>Short Description</TableCell>
						<TableCell>POC Name</TableCell>
						<TableCell>POC Phone</TableCell>
						<TableCell>POC Email</TableCell>
						<TableCell>Last Updated</TableCell>
						<TableCell>Owner</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{/* may require editting to fit new tasker formats into the table */}
					{alldata.map(entry => (
						<UserTableRow hover={true} key={entry.id} entry={entry} />
					))}
				</TableBody>
			</MuiTable>
		</>
	);
};
export default UserTable;
