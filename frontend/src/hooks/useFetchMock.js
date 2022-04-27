import React, { useState, useEffect } from "react";
import { mockUserData } from "../data/mockUserData";
import { mockAdminData } from "../data/mockUserData";

const useFetchMock = (mockUrlRoute, revision, delay) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	if (mockUrlRoute === "/api/mock/user")
		new Promise((resolve, reject) => {
			setTimeout(() => {
				setData(mockUserData);
				setIsLoading(false);
			}, delay);
		});

	if (mockUrlRoute === "/api/mock/admin")
		new Promise((resolve, reject) => {
			setTimeout(() => {
				setData(mockAdminData);
				setIsLoading(false);
			}, delay);
		});

	return { data, error, isLoading };
};

export default useFetchMock;
