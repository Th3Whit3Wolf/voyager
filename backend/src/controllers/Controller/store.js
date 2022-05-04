/**
 * Wraps database read query in an exception handler,
 * which allows for a consistent return value even if an error occurs.
 *
 * @param {*} query
 * @return {data} on success
 * @return {[]} on error
 */
const handleDatabaseRead = async query => {
	try {
		return await query;
	} catch (err) {
		// Add logger here...
		return [];
	}
};

/**
 * Wraps database write query in an exception handler,
 * which allows for a consistent return value even if an error occurs.
 *
 * @param {*} query
 * @return {data} on success
 * @return {null} on error
 */
const handleDatabaseWrite = async query => {
	try {
		return await query;
	} catch (err) {
		// Add logger here...
		return null;
	}
};

export { handleDatabaseRead, handleDatabaseWrite };
