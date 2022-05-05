-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "unit_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "seperation_date" SET DEFAULT NOW() + interval '4 year';
