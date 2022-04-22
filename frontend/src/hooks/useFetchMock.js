import React, { useState, useEffect } from "react";

const useFetchMock = (mockUrlRoute, revision) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	return { data, error, isLoading };
};

export default useFetchMock;
