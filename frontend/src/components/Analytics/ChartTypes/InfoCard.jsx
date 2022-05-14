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
				borderRadius: "2rem",
				minWidth: "100px",
				boxShadow: "6px 6px 9px 2px rgba(0, 0, 0, 0.5)"
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