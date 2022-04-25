-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "installation_id" INTEGER,
    "command_id" INTEGER,
    "delta_id" INTEGER,
    "squadron_id" INTEGER,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_installation_id_fkey" FOREIGN KEY ("installation_id") REFERENCES "installations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "commands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_delta_id_fkey" FOREIGN KEY ("delta_id") REFERENCES "deltas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_squadron_id_fkey" FOREIGN KEY ("squadron_id") REFERENCES "squadrons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
