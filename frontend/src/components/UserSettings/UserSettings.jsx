import React from "react";

const UserSettings = ({ settings }) => {
	return (
		<div>
			<h1>User Settings</h1>
			<ul>
				<li> First Name: {settings.firstName}</li>
				<li> Last Name: {settings.lastName}</li>
				<li> Email: {settings.email}</li>
			</ul>
		</div>
	);
};

export default UserSettings;
