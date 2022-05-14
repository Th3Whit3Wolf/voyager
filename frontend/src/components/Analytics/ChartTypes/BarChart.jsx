// Base React
import React from "react";

// Our Packages
import styles from "./ChartTypes.module.css";

// Third Party Packages
import { Card, CardContent, useTheme, Paper } from "@mui/material";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";

const VoyagerBarChart = ({ datasets }) => {
	let { data, barInfo } = datasets;
	const theme = useTheme();

	// console.log("THEME:", theme.palette);

	return (
		<Card
			sx={{
				padding: "2rem",
				marginLeft: "2rem",
				borderRadius: "2rem",
				// width: "100%",
				// height: "100%",
				backgroundColor: theme.palette.hover.default,
				boxShadow: "6px 6px 9px 2px rgba(0, 0, 0, 0.5)"
			}}
		>
			<CardContent>
				<BarChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" className={styles.barchart} />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					{barInfo.map(barI => (
						<Bar key={barI.dataKey} {...barI} />
					))}
				</BarChart>
			</CardContent>
		</Card>
	);
};

export default VoyagerBarChart;
