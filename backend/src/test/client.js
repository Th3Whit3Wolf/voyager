// teamplting for future Prisma Method Test (from https://www.prisma.io/docs/guides/testing/unit-testing)
// not fully implemente since custom Prisma functions not complete yet

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
