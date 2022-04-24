-- CreateTable
CREATE TABLE "deltas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbrev" VARCHAR(50) NOT NULL,
    "function" TEXT NOT NULL,
    "command_id" INTEGER,

    CONSTRAINT "deltas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deltas_name_key" ON "deltas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "deltas_abbrev_key" ON "deltas"("abbrev");

-- AddForeignKey
ALTER TABLE "deltas" ADD CONSTRAINT "deltas_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "commands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
