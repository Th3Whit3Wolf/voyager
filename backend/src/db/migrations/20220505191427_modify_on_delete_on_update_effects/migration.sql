-- DropForeignKey
ALTER TABLE "task_users" DROP CONSTRAINT "task_users_task_id_fkey";

-- DropForeignKey
ALTER TABLE "task_users" DROP CONSTRAINT "task_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_assigned_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "seperation_date" SET DEFAULT NOW() + interval '4 year',
ALTER COLUMN "assigned_unit_id" DROP NOT NULL,
ALTER COLUMN "role_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_assigned_unit_id_fkey" FOREIGN KEY ("assigned_unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_users" ADD CONSTRAINT "task_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_users" ADD CONSTRAINT "task_users_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
