import {
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Checkbox
} from "@mui/material";
import UserTableRow from "../../TableRow/UserTableRow/UserTableRow";
//import { useEffect } from "react";
const UserTable = ({ alldata }) => {
	var data = [];
	console.log(alldata);
	for (var x in alldata) {
		fetch(`http://localhost:8081/api/v1/tasks/${alldata[x].id}`)
			.then(response => response.json())
			.then(newfetch => (data[x] = newfetch));
		console.log(x);
	}
	console.log(data);

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
					{data.map(entry => (
						<UserTableRow hover={true} key={entry.id} entry={entry} />
					))}
				</TableBody>
			</MuiTable>
		</>
	);
};
export default UserTable;
