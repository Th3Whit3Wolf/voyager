import React from "react";

const UserSettings = ({ settings }) => {
	return (
		<div>
			<h1>User Settings</h1>
			<ul>
				<li>
					{" "}
					{settings.firstName} {settings.lastName}
				</li>
				<li> Email: {settings.email}</li>
				<li> DSN: {settings.dsn}</li>
			</ul>
		</div>
	);
};

export default UserSettings;
