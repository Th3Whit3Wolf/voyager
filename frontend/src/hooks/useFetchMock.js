import React, { useState, useEffect } from "react";
import { mockUserData } from "../data/mockUserData";

const useFetchMock = (mockUrlRoute, revision, delay) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const dataPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			setData(mockUserData);
		}, delay);
	});

	dataPromise.then(() => console.log(data)).finally(() => setIsLoading(false));

	return { data, error, isLoading };
};

export default useFetchMock;
