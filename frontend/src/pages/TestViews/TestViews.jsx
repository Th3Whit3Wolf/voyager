import React, { useState, useEffect } from "react";

import { TextField, Button } from "@mui/material";
const TestViews = () => {
	const [endpoint, setEndpoint] = useState("");
	const [data, setData] = useState([]);

	const handleInput = e => {
		setEndpoint(e.target.value);
	};

	const handleFetch = e => {
		fetch(`http://localhost:8081/api/v1/${endpoint}`)
			.then(response => response.json())
			.then(d => setData(d));
	};

	// Changing the Test View to Test the Very First Entry at an Endpoint
	return (
		<div>
			<h1>Test Views Rendered</h1>
			<TextField
				sx={{ width: "50ch" }}
				placeholder={"users/1"}
				label={"Enter URL Endpoint to Test"}
				value={endpoint}
				onChange={handleInput}
			/>
			<h3>Route to Search: {`api/v1/${endpoint}/1`}</h3>
			<Button onClick={handleFetch}>Click to Fetch</Button>
			<div>{data && data.map(task => <p key={task.id}>{task.title}</p>)}</div>
		</div>
	);
};

export default TestViews;
