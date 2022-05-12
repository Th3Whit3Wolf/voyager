import { createRequire } from "module";
import { genData } from "../utils";

const require = createRequire(import.meta.url);
const taskUsers = require("../data/task_users.json");

const seedTaskUsers = async (prisma, dbg = false) => {
	await genData(prisma, "TaskUser", taskUsers, [], dbg);
};

export default seedTaskUsers;
