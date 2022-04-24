const { PrismaClient } = require("@prisma/client");

const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "docker";
const PG_PORT = process.env.PG_PORT || 5432;
const PG_HOST = process.env.PG_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "voyager";

const URI =
	process.env.DATABASE_URL === undefined
		? `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${DB_NAME}?schema=public`
		: process.env.DATABASE_URL;

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: URI
		}
	}
});

const createInstallations = async () => {
	const buckley = await prisma.Installation.upsert({
		where: { name: "Buckley Space Force Base" },
		update: {},
		create: {
			name: "Buckley Space Force Base",
			location: "Aurora, Colorado"
		}
	});

	/*
	const losAngelos = await prisma.Installation.upsert({
		name: "Los Angeles Air Force Base",
		location: "El Segundo, California"
	});

	const patrick = await prisma.Installation.upsert({
		name: "Patrick Space Force Base",
		location: "Brevard County, Florida"
	});

	const peterson = await prisma.Installation.upsert({
		name: "Peterson Space Force Base",
		location: "Colorado Springs, Colorado"
	});

	const schriever = await prisma.Installation.upsert({
		name: "Schriever Space Force Base",
		location: "Colorado Springs, Colorado"
	});

	const vandenberg = await prisma.Installation.upsert({
		name: "Vandenberg Space Force Base",
		location: "Santa Barbara County, California"
	});

	const capeCanaveral = await prisma.Installation.upsert({
		name: "Cape Canaveral Space Force Station",
		location: "Cape Canaveral, Florida"
	});

	const capeCod = await prisma.Installation.upsert({
		name: "Cape Cod Space Force Station",
		location: "Bourne, Massachusetts"
	});

	const cavalier = await prisma.Installation.upsert({
		name: "Cavalier Space Force Station",
		location: "Cavalier, North Dakota"
	});

	const cheyenneMountain = await prisma.Installation.upsert({
		name: "Cheyenne Mountain Space Force Station",
		location: "Colorado Springs, Colorado"
	});

	const clear = await prisma.Installation.upsert({
		name: "Clear Space Force Station",
		location: "Clear, Alaska"
	});

	const kaenaPoint = await prisma.Installation.upsert({
		name: "Kaena Point Space Force Station",
		location: "Honolulu County, Hawaii"
	});

	const newBoston = await prisma.Installation.upsert({
		name: "New Boston Space Force Station",
		location: "New Boston, New Hampshire"
	});
    */

	console.log({
		buckley
	});
};

async function main() {
	await createInstallations();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
