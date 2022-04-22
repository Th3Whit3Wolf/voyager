import React from "react";

// Third Party
import { CircularProgress } from "@mui/material";

const Loading = () => {
	return (
		<div>
			<h3>Loading Data...</h3>
			<CircularProgress />
		</div>
	);
};

export default Loading;
