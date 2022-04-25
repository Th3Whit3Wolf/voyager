import React from "react";

// Our Styles
import styles from "./SplashScreen.module.css";

// MUI Styles
import {
	Paper,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Switch
} from "@mui/material";

const SplashScreen = () => {
	return (
		<div className={styles.blackout}>
			<div className={styles.center}>
				<div>
					<h1>Voyager</h1>
					<table>
						<tbody>
							<tr>
								<td className={styles.mimicTyping1}>Inprocessing Now</td>
							</tr>
						</tbody>
					</table>
					{/* <p className={styles.mimicTyping1}>Inprocessing Now</p>
					<p className={styles.mimicTyping2}>Outprocessing Now</p>
					<p className={styles.mimicTyping3}>Success!</p> */}
				</div>
				{/* <TableContainer component={Paper} sx={{ width: "50%" }}>
					<Table size={"small"}>
						<TableBody>
							<TableRow>
								<TableCell>
									<Switch />
								</TableCell>
								<TableCell>Inprocessing Now</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Switch />
								</TableCell>
								<TableCell>Outprocessing Now</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Switch />
								</TableCell>
								<TableCell>Success!</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer> */}
			</div>
		</div>
	);
};

export default SplashScreen;
