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
	name: true,
	abbrev: true,
	function: true,
	children: {
		select: {
			id: true,
			name: true,
			abbrev: true,
			function: true
		}
	},
	grandChildren: {
		select: {
			id: true,
			name: true,
			abbrev: true,
			function: true
		}
	}
};

const Units = {
	getByID: async (req, res, next) => {
		const { unitID } = req.params;
		const id = parseInt(unitID);
		try {
			const query = await prisma.Unit.findFirst({
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
			const query = await prisma.Unit.findMany({
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	}
};

export default Units;
