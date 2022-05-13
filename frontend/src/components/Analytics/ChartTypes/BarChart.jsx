import React from "react";

// Third Party Packages
import { Card } from "@mui/material";

import {
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	VerticalBarSeries,
	DiscreteColorLegend
} from "react-vis";

// const greenData = [
// 	{
// 		x: "Total",
// 		y: total_in.length
// 	},
// 	{
// 		x: "Total Active",
// 		y: total_in_active.length
// 	}
// ];

const BarChart = ({ datasets }) => {
	return (
		<Card
			sx={{
				backgroundColor: "#000000",
				padding: "10px",
				borderRadius: "5px"
			}}
		>
			{" "}
			<XYPlot xType="ordinal" width={500} height={400} xDistance={10}>
				<VerticalGridLines />
				<HorizontalGridLines />
				<XAxis style={{ fontSize: "1.1em" }} />
				<YAxis style={{ fontSize: "1.05em" }} />
				{datasets.map((dataset, idx) => (
					<VerticalBarSeries key={idx} data={dataset} />
				))}
				{/* <VerticalBarSeries data={datasets} />
				<VerticalBarSeries data={blueData} /> */}
			</XYPlot>
			<DiscreteColorLegend
				style={{ fontSize: "1.1rem", color: "white" }}
				width={180}
				items={[{ title: "Inprocessing" }, "Outprocessing"]}
			/>
		</Card>
	);
};

export default BarChart;
