/*
  Warnings:

  - You are about to drop the column `userID` on the `Day` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_userID_fkey";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "userID";
