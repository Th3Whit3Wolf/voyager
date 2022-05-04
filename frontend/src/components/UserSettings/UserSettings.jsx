import React from "react";

const UserSettings = ({ settings }) => {
	return (
		<div>
			<h1>User Settings</h1>
			<ul>
				<li> First Name: {settings.firstName}</li>
			</ul>
		</div>
	);
};

export default UserSettings;
