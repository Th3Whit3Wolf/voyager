import React, { useState, useEffect } from "react";

const useFetch = ({ url, role, user }) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	if (role == "admin") {
		//<--------
		useEffect(() => {
			// <---------
			fetch(url)
				.then(response => response.json())
				.then(filter_value => filter_value.filter(v => v.assignerID == user.id))
				.then(newData => setData(newData))
				.finally(setIsLoading(false));
		}, []);
		return { data, error, isLoading };
	}
	//need unit ID
	else if (role == "user") {
		return { data, error, isLoading };
	}
};
export default useFetch;
