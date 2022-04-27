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

const kind = "DELTA";
const select = {
	id: true,
	name: true,
	abbrev: true,
	function: true,
	parent: {
		select: {
			id: true,
			name: true,
			abbrev: true,
			function: true
		}
	}
};

const Deltas = {
	getByID: async (req, res, next) => {
		const { deltaID } = req.params;
		const id = parseInt(deltaID);
		try {
			const query = await prisma.Unit.findMany({
				where: { kind, id },
				select
			});
			return res.status(200).json(query);
		} catch (err) {
			return next(err);
		}
	},

	getAll: async (req, res, next) => {
		try {
			const query = await prisma.Unit.findMany({
				where: { kind },
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	}
};

export default Deltas;
