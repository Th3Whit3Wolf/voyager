-- AlterTable
ALTER TABLE "users" ALTER COLUMN "seperation_date" SET DEFAULT NOW() + interval '4 year';
