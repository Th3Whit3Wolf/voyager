/* eslint-disable indent */
/**
 * Constructs a Prisma query by parsing all the query parameters
 *
 * @param {Array} queryArray
 * @return {Object}
 */
const parsedQuery = (query, searchAttributes = {}, enumAttributes = []) => {
	const entries = Object.entries(query);

	const parsed = {
		AND: [
			...entries.map(([key, value]) => {
				if (searchAttributes[key] === false) return null;

				const transformation = Object.fromEntries([[key, value]]);

				try {
					const parsedValue = JSON.parse(value);
					transformation[key] = parsedValue;
				} catch (error) {
					transformation[key] = value;
				}

				if (typeof transformation[key] === "string" && key !== "id") {
					transformation[key] = enumAttributes.includes(key)
						? {
								in: value
						  }
						: {
								contains: value,
								mode: "insensitive"
						  };
				}

				return transformation;
			})
		].filter(key => key !== null)
	};

	return parsed;
};

export default parsedQuery;
