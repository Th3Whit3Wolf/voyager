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
	firstName: true,
	lastName: true,
	email: true,
	dsn: true

	/*
	officeSymbol: true,
	status: true,
	sperationDate: true,
	asignedUnit: {
		select: {
			id: true,
			name: true,
			abbrev: true,
			function: true
		}
	},
	gainingUnit: {
		select: {
			id: true,
			name: true,
			abbrev: true,
			function: true
		}
	},
	role: {
		id: true,
		kind: true
	},
	supervisor: {
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		dsn: true,
		officeSymbol: true,
		status: true,
		asignedUnit: {
			select: {
				id: true,
				name: true,
				abbrev: true,
				function: true
			}
		}
	},
	subordinates: {
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		dsn: true,
		officeSymbol: true,
		status: true,
		asignedUnit: {
			select: {
				id: true,
				name: true,
				abbrev: true,
				function: true
			}
		}
	}
    */
};

const Users = {
	getByID: async (req, res, next) => {
		const { userID } = req.params;
		const id = parseInt(userID);
		try {
			const query = await prisma.User.findFirst({
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
			const query = await prisma.User.findMany({
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	}
};

export default Users;
