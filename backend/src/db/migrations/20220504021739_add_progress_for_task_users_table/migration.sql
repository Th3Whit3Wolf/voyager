/*
  Warnings:

  - Added the required column `progress` to the `task_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_users" ADD COLUMN     "progress" "TaskStatus" NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "seperation_date" SET DEFAULT NOW() + interval '4 year';
