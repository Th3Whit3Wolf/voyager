import React, { useState, useEffect } from "react";
import { mockUserData } from "../data/mockUserData";

const useFetchMock = (mockUrlRoute, revision) => {
	console.log(mockUserData);

	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	return { data, error, isLoading };
};

export default useFetchMock;
