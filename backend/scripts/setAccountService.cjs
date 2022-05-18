const fs = require("fs");
const path = require("path");

const { FIREBASE_VOYAGER_SERVICE_ACCOUNT } = process.env;
const data = FIREBASE_VOYAGER_SERVICE_ACCOUNT;

fs.writeFileSync(
	path.resolve(__dirname, "../src/config/accountService.json"),
	data,
	{
		encoding: "utf8",
		flag: "a+"
	}
);
