-- CreateTable
CREATE TABLE "installations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" VARCHAR(50) NOT NULL,

    CONSTRAINT "installations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "installations_name_key" ON "installations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "installations_location_key" ON "installations"("location");
