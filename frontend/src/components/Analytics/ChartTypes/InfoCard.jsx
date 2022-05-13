import React from "react";

// Third Party Packages
import { Card } from "@mui/material";

const InfoCard = ({ title, value }) => {
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: "#000000",
				padding: "20px",
				borderRadius: "5px",
				minWidth: "100px"
			}}
		>
			<div style={{ letterSpacing: "2px", fontSize: "1.2rem" }}>
				{title.toUpperCase()}
			</div>
			<div style={{ letterSpacing: "2px", fontSize: "1.2rem" }}>{value}</div>
		</Card>
	);
};

export default InfoCard;
