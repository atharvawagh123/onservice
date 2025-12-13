/*
  Warnings:

  - The `role` column on the `userapi_userprofile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUBADMIN', 'USER');

-- AlterTable
ALTER TABLE "userapi_userprofile" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
