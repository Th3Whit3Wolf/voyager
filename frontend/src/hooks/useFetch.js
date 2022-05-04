import React, { useState, useEffect } from "react";

const useFetch = ({ url }) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(d => console.log(d))
			.catch(e => setError(e));

		setIsLoading(false);
	}, []);
	//return { data, error, isLoading };
};

export default useFetch;
