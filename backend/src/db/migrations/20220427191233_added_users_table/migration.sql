-- AlterTable
ALTER TABLE "units" ALTER COLUMN "abbrev" SET DATA TYPE VARCHAR(64);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(64) NOT NULL,
    "lastName" VARCHAR(64) NOT NULL,
    "auth" TEXT NOT NULL,
    "officeSymbol" VARCHAR(64) NOT NULL,
    "status" "ProcessingStatus" NOT NULL,
    "seperation_date" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '4 year',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_unit_id" INTEGER NOT NULL,
    "gaining_unit_id" INTEGER,
    "role_id" INTEGER,
    "supervisor_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_assigned_unit_id_fkey" FOREIGN KEY ("assigned_unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_gaining_unit_id_fkey" FOREIGN KEY ("gaining_unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
