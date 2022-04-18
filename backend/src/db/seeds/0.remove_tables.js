/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async knex => {
	console.log("\nStarting seed 0.remove_tables.js");

	// Deletes ALL existing entries
	[].forEach(async table => {
		console.log(`  Removing old ${table}`);
		await knex(table).del();
	});
};
