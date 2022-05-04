import React, { useState, useEffect } from "react";

const useLogin = (email, password) => {
	const [user, setUser] = useState([]);
	const [logStatus, setLogStatus] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:8081/api/v1/users`)
			.then(response => response.json())
			.then(userList => userList.filter(user.email === email))
			.then(result => console.log(result));
	});

	return { user, logStatus };
};

export default useLogin;
