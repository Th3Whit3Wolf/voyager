import Prisma from "@prisma/client";
import parsedQuery from "./parsedQuery";
import { handleDatabaseWrite, handleDatabaseRead } from "./store";

const { PrismaClient } = Prisma;
const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "docker";
const PG_PORT = process.env.PG_PORT || 5432;
const PG_HOST = process.env.PG_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "voyager";
const URI =
	process.env.DATABASE_URL === undefined
		? `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${DB_NAME}?schema=public`
		: process.env.DATABASE_URL;

const db = new PrismaClient({
	datasources: {
		db: {
			url: URI
		}
	}
});

const defaultErrorMessages = {
	create: "An error occurred while attempting to create this resource.",
	list: "An error occurred while attempting to list the resources.",
	get: "An error occurred while attempting to get this resource",
	update: "An error occurred while attempting to update this resource.",
	delete: "An error occurred while attempting to delete this resource.",
	notFound: "Resource not found."
};

class Controller {
	/**
	 * Creates an instance of Controller.
	 * @param {*} resource
	 * @memberof Controller
	 * {@link https://oleoneto.medium.com/using-prisma-js-to-replace-knex-js-while-also-refactoring-route-controllers-in-express-9dbc7d3c892e Using Prisma.js to Replace Knex.js While Also Refactoring Route Controllers in Express}
	 */
	constructor(
		resourceName,
		{
			queryOptions = {},
			errorMessages = {},
			searchAttributes = {},
			enumAttributes = [],
			defaultQueryLimit = 20
		}
	) {
		this.resourceName = resourceName;
		this.dbResource = db[resourceName];
		this.queryLimit = Number(defaultQueryLimit || 20);

		this.create = this.create.bind(this);
		this.list = this.list.bind(this);
		this.get = this.get.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.enumAttributes = Array.isArray(enumAttributes)
			? enumAttributes
			: [];
		this.searchOptions = searchAttributes;

		this.queryOptions = {
			read: queryOptions.read ? queryOptions.read : {},
			get: queryOptions.get ? queryOptions.get : {},
			list: queryOptions.list ? queryOptions.list : {},
			update: queryOptions.update ? queryOptions.update : {},
			delete: queryOptions.delete ? queryOptions.delete : {}
		};

		this.errorMessages = {
			create: errorMessages.create
				? errorMessages.create
				: defaultErrorMessages.create,
			list: errorMessages.list
				? errorMessages.list
				: defaultErrorMessages.list,
			get: errorMessages.get
				? errorMessages.get
				: defaultErrorMessages.get,
			update: errorMessages.update
				? errorMessages.update
				: defaultErrorMessages.update,
			delete: errorMessages.delete
				? errorMessages.delete
				: defaultErrorMessages.delete
		};
	}

	/**
	 * POST and create a resource
	 *
	 * @param {*} req
	 * @param {*} res
	 * @return {status} 201 Created
	 * @return {status} 500 Server Error
	 * @memberof Controller
	 */
	async create(req, res) {
		const { body } = req;

		const data = await handleDatabaseWrite(
			this.dbResource.create({ data: body })
		);

		return data
			? res.status(201).send({ data })
			: res.status(500).send({ message: this.errorMessages.create });
	}

	/**
	 * GET a paginated list of resources
	 *
	 * @param {*} req
	 * @param {*} res
	 * @return {status} 200 OK
	 * @memberof Controller
	 */
	async list(req, res) {
		let { limit, page, ...query } = req.query;

		query = parsedQuery(query, this.searchOptions, this.enumAttributes);
		limit = Number(limit || this.queryLimit);
		page = Number(page || 1);

		const data = await handleDatabaseRead(
			this.dbResource.findMany({
				where: query,
				take: limit,
				skip: (page - 1) * limit,
				...this.queryOptions.read,
				...this.queryOptions.list
			})
		);

		return res.status(200).send({
			pagination: {
				page,
				limit,
				total: data.length
			},
			data
		});
	}

	/**
	 * GET a single resource identified by :id
	 *
	 * @param {*} req
	 * @param {*} res
	 * @return {status} 200 OK
	 * @return {status} 404 Not Found
	 * @memberof Controller
	 */
	async get(req, res) {
		const { id: idStr } = req.params;
		try {
			const id = parseInt(idStr);
			const data = await handleDatabaseRead(
				this.dbResource.findUnique({
					where: { id },
					...this.queryOptions.read,
					...this.queryOptions.get
				})
			);
			return data
				? res.status(200).send({ data })
				: res.status(404).send({ message: this.errorMessages.get });
		} catch (err) {
			return res.status(404).send({ message: this.errorMessages.get });
		}
	}

	/**
	 * PATCH/UPDATE a single resource identified by :id
	 *
	 * @param {*} req
	 * @param {*} res
	 * @return {status} 202 Accepted
	 * @return {status} 500 Server Error
	 * @memberof Controller
	 */
	async update(req, res) {
		const { id: idStr } = req.params;
		const { body } = req;

		try {
			const id = parseInt(idStr);
			const data = await handleDatabaseWrite(
				this.dbResource.update({
					where: { id },
					data: body,
					...this.queryOptions.update
				})
			);
			return data
				? res.status(202).send({ data })
				: res.status(500).send({ message: this.errorMessages.update });
		} catch (err) {
			return res.status(500).send({ message: this.errorMessages.update });
		}
	}

	/**
	 * DELETE a single resource identified by :id
	 *
	 * @param {*} req
	 * @param {*} res
	 * @return {status} 204 No Content
	 * @return {status} 500 Server Error
	 * @memberof Controller
	 */
	async delete(req, res) {
		const { id } = req.params;

		try {
			await this.dbResource.delete({
				where: { id },
				...this.queryOptions.delete
			});

			return res.status(204).send();
		} catch (err) {
			return res.status(500).send({ message: this.errorMessages.delete });
		}
	}
}

export default Controller;
