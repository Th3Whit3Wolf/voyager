import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";
const TestViews = ({ rt }) => {
	const [endpoint, setEndpoint] = useState("");

	useEffect(() => {
		setEndpoint(rt);
	}, [rt]);

	return (
		<div>
			<h1>Test Views Rendered</h1>
			<TextField
				sx={{ width: "50ch" }}
				placeholder={"users/1"}
				label={"Enter URL Endpoint to Test"}
			/>
		</div>
	);
};

export default TestViews;
