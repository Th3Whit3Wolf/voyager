/*
  Warnings:

  - You are about to drop the column `auth` on the `users` table. All the data in the column will be lost.
  - Added the required column `img` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "units" ADD COLUMN     "img" VARCHAR(64) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth",
ALTER COLUMN "seperation_date" SET DEFAULT NOW() + interval '4 year';
