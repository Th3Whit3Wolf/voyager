const app = require("./server");

const port = process.env.PORT || 8081;

const start = p => {
	try {
		app.listen(p, () => {
			console.log(`Api running at http://localhost:${p}  🚀`);
		});
	} catch (err) {
		console.error(err);
		process.exit();
	}
};

start(port);
