const path = require("path");

const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "docker";
const PG_PORT = process.env.PG_PORT || 5432;

// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	production: {
		client: "postgresql",
		connection: {
			host: "127.0.0.1",
			password: PG_PASSWORD,
			user: PG_USER,
			port: PG_PORT,
			database: "voyager"
		},
		migrations: {
			directory: path.join(__dirname, "./migrations")
		}
	},
	development: {
		client: "postgresql",
		connection: {
			host: "127.0.0.1",
			password: PG_PASSWORD,
			user: PG_USER,
			port: PG_PORT,
			database: "voyager"
		},
		migrations: {
			directory: path.join(__dirname, "./migrations")
		}
	},
	test: {
		client: "postgresql",
		connection: {
			host: "127.0.0.1",
			password: PG_PASSWORD,
			user: PG_USER,
			port: PG_PORT,
			database: "voyager"
		},
		migrations: {
			directory: path.join(__dirname, "./migrations")
		}
	}
};
