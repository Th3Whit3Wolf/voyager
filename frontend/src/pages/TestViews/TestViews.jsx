import React, { useState, useEffect } from "react";

const TestViews = ({ rt }) => {
	const [endpoint, setEndpoint] = useState("");

	useEffect(() => {
		setEndpoint(rt);
	}, [rt]);

	return (
		<div>
			<h1>Test Views Rendered</h1>
			<input type="text" placeholder="users/1" />
		</div>
	);
};

export default TestViews;
