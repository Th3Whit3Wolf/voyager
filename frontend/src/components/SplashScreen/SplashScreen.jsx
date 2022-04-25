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
								<td>
									<div className={styles.mimicTyping1}>Inprocessing Now</div>
								</td>
							</tr>
							<tr>
								<td>
									<div className={styles.mimicTyping2}>Outprocessing Now</div>
								</td>
							</tr>
							<tr>
								<td>
									<div className={styles.mimicTyping3}>Success!</div>
								</td>
							</tr>
						</tbody>
					</table>
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
