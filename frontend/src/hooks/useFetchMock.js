import React, { useState, useEffect } from "react";
import { mockUserData } from "../data/mockUserData";

const useFetchMock = (mockUrlRoute, revision, delay) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	if (mockUrlRoute === "/api/mock/user")
		new Promise((resolve, reject) => {
			setTimeout(() => {
				setData(mockUserData);
			}, delay);
		})
			.then(() => console.log(data))
			.finally(() => setIsLoading(false));

	if (mockUrlRoute === "/api/mock/admin") {
		console.log("No mockAdinData in data folder yet.");
	}

	return { data, error, isLoading };
};

export default useFetchMock;
