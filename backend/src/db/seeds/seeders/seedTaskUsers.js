import { createRequire } from "module";
// eslint-disable-next-line import/extensions
import { genData } from "../utils.js";

const require = createRequire(import.meta.url);
const taskUsers = require("../data/task_users.json");

const seedTaskUsers = async (prisma, dbg = false) => {
	await genData(prisma, "TaskUser", taskUsers, [], dbg);
};

export default seedTaskUsers;
