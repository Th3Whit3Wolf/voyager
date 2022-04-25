-- CreateTable
CREATE TABLE "squadrons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbrev" VARCHAR(50) NOT NULL,
    "function" TEXT NOT NULL,
    "delta_id" INTEGER,
    "installation_id" INTEGER,

    CONSTRAINT "squadrons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "squadrons_name_key" ON "squadrons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "squadrons_abbrev_key" ON "squadrons"("abbrev");

-- AddForeignKey
ALTER TABLE "squadrons" ADD CONSTRAINT "squadrons_installation_id_fkey" FOREIGN KEY ("installation_id") REFERENCES "installations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squadrons" ADD CONSTRAINT "squadrons_delta_id_fkey" FOREIGN KEY ("delta_id") REFERENCES "deltas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
