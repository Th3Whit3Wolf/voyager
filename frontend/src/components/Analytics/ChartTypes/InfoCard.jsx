import React from "react";

// Third Party Packages
import { Card, CardHeader, CardContent, useTheme } from "@mui/material";

const InfoCard = ({ title, value }) => {
	const theme = useTheme();
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				borderRadius: "0.75rem",
				maxWidth: "100%",
				boxShadow:
					theme.palette.mode === "light"
						? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
						: "0 .75em 1.5em -.185em rgba(	0, 0, 0,.9), 0 0 1px rgba(	0, 0, 0,.02)"
			}}
		>
			<CardHeader
				title={title}
				sx={{
					display: "flex",
					flexGrow: 1,
					fontWeight: 700,
					padding: "0.75rem 1.5rem",
					pb: "0.1rem"
				}}
				titleTypographyProps={{ variant: "h3" }}
			></CardHeader>
			<CardContent
				typographyProps={{ variant: "h4" }}
				sx={{
					padding: "1.5rem",
					pt: "0.5rem",
					fontSize: "1.25rem"
				}}
			>
				{value}
			</CardContent>
		</Card>
	);
};

/*
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
*/

export default InfoCard;
