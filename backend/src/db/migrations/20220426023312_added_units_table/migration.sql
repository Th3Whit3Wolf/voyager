-- CreateEnum
CREATE TYPE "UnitKind" AS ENUM ('INSTALLATION', 'COMMAND', 'DELTA', 'SQUADRON');

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbrev" VARCHAR(50),
    "kind" "UnitKind" NOT NULL,
    "function" TEXT,
    "location" TEXT,
    "parentID" INTEGER,
    "grandParentID" INTEGER,
    "installationID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_name_key" ON "units"("name");

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_grandParentID_fkey" FOREIGN KEY ("grandParentID") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_installationID_fkey" FOREIGN KEY ("installationID") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
