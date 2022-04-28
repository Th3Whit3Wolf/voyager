/*
  Warnings:

  - The values [IN_PROCESSING_WITH_ORDERS] on the enum `ProcessingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProcessingStatus_new" AS ENUM ('IN_PROCESSING', 'IN_TRANSIT', 'OUT_PROCESSING', 'OUT_PROCESSING_WITH_ORDERS', 'STATIONARY');
ALTER TABLE "users" ALTER COLUMN "status" TYPE "ProcessingStatus_new" USING ("status"::text::"ProcessingStatus_new");
ALTER TYPE "ProcessingStatus" RENAME TO "ProcessingStatus_old";
ALTER TYPE "ProcessingStatus_new" RENAME TO "ProcessingStatus";
DROP TYPE "ProcessingStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "seperation_date" SET DEFAULT NOW() + interval '4 year';
