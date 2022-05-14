-- AlterTable
ALTER TABLE "task_users" ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '4 months';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "seperation_date" SET DEFAULT NOW() + interval '4 year';
