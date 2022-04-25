// this knex declaration probably needs to be reviewed
const knex = require("knex")(require("../knexfile.js").development);

// theintent is to export this helper function from routes to server.js-is that correct
// example app.get(/installation, fullQuery(req,res,"installations"))...is that ok
function fullQuery(req, res, tableName) {
	if (tableName) {
		knex(tableName)
			.select("*")
			.then(rows => {
				res.status(200).json(rows);
			});
	} else {
		res.status(502).send(
			"Empty/Null tableName passed internally by server"
		);
	}
}
