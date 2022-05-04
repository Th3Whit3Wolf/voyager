import Prisma from "@prisma/client";
import { URI } from "../db/seeds/utils";

const { PrismaClient } = Prisma;

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: URI
		}
	}
});

const select = {
	id: true,
	title: true,
	description: true,
	isActive: true,
	kind: true,
	assignerID: true,
	approverID: true,
	unitID: true,
	createdAt: true,
	updatedAt: true
};

const Tasks = {
	getByID: async (req, res, next) => {
		const { taskID } = req.params;
		const id = parseInt(taskID);
		try {
			const query = await prisma.Task.findFirst({
				where: { id },
				select
			});
			return res.status(200).json(query);
		} catch (err) {
			return next(err);
		}
	},

	getAll: async (req, res, next) => {
		try {
			const query = await prisma.Task.findMany({
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	}
};

export default Tasks;
