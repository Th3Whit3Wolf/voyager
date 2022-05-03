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
	kind: true
};

const Roles = {
	getByID: async (req, res, next) => {
		const { roleID } = req.params;
		const id = parseInt(roleID);
		try {
			const query = await prisma.Role.findFirst({
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
			const query = await prisma.Role.findMany({
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	},
	getAllUsers: async (req, res, next) => {
		try {
			const query = await prisma.Role.findMany({
				where: { kind: "USER" },
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	},
	getAllAdmins: async (req, res, next) => {
		try {
			const query = await prisma.Role.findMany({
				where: {
					NOT: {
						kind: {
							equals: "USER"
						}
					}
				},
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	},
	getAllSiteAdmins: async (req, res, next) => {
		try {
			const query = await prisma.Role.findMany({
				where: {
					kind: "SITE_ADMIN"
				},
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	},
	getAllCommandAdmins: async (req, res, next) => {
		try {
			const query = await prisma.Role.findMany({
				where: { kind: "COMMAND_ADMIN" },
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	},
	getAllInstallationAdmins: async (req, res, next) => {
		try {
			const query = await prisma.Role.findMany({
				where: { kind: "INSTALLATION_ADMIN" },
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	},
	getAllDeltaAdmins: async (req, res, next) => {
		try {
			const query = await prisma.Role.findMany({
				where: { kind: "DELTA_ADMIN" },
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	},
	getAllSquadronAdmins: async (req, res, next) => {
		try {
			const query = await prisma.Role.findMany({
				where: { kind: "SQUADRON_ADMIN" },
				select
			});
			res.status(200).json(query);
		} catch (err) {
			next(err);
		}
	}
};

export default Roles;
