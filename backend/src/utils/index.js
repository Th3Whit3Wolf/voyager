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

function keyQuery(req, res, tableName, key) {
	if (tableName) {
		if (!req.body.key) {
			req.body.key = "*";
		}
		knex(tableName)
			.select("*")
			.where("id", req.body.key)
			.then(rows => {
				res.status(200).json(rows);
			});
	} else {
		res.status(502).send(
			"Empty/Null tableName passed internally by server"
		);
	}
}

function patchContent(req, res, tableName) {
	if (req.body.key) {
		knex(tableName).where(req.body.key).update(req.body);
	} else {
		res.status(502).send(
			` 'req.body.key' not defined for patch to query on`
		);
	}
}

function deleteContent(req, res, tableName) {
	if (req.body.key) {
		knex(tableName).where(req.body.key).del();
	} else {
		res.status(502).send(
			` 'req.body.key' not defined for delete to query on`
		);
	}
}

module.exports = {
	fullQuery,
	keyQuery,
	patchContent,
	deleteContent
};
