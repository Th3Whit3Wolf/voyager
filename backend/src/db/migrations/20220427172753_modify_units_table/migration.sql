/*
  Warnings:

  - You are about to drop the column `unitID` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `grandParentID` on the `units` table. All the data in the column will be lost.
  - You are about to drop the column `installationID` on the `units` table. All the data in the column will be lost.
  - You are about to drop the column `parentID` on the `units` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_unitID_fkey";

-- DropForeignKey
ALTER TABLE "units" DROP CONSTRAINT "units_grandParentID_fkey";

-- DropForeignKey
ALTER TABLE "units" DROP CONSTRAINT "units_installationID_fkey";

-- DropForeignKey
ALTER TABLE "units" DROP CONSTRAINT "units_parentID_fkey";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "unitID",
ADD COLUMN     "unit_id" INTEGER;

-- AlterTable
ALTER TABLE "units" DROP COLUMN "grandParentID",
DROP COLUMN "installationID",
DROP COLUMN "parentID",
ADD COLUMN     "grand_parent_id" INTEGER,
ADD COLUMN     "installation_id" INTEGER,
ADD COLUMN     "parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_grand_parent_id_fkey" FOREIGN KEY ("grand_parent_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_installation_id_fkey" FOREIGN KEY ("installation_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
