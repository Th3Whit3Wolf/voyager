-- AlterTable
ALTER TABLE "installations" ALTER COLUMN "location" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "commands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbrev" VARCHAR(50) NOT NULL,
    "function" TEXT NOT NULL,

    CONSTRAINT "commands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commands_name_key" ON "commands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "commands_abbrev_key" ON "commands"("abbrev");
