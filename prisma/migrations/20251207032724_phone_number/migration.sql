/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `ReporterInfo` table. All the data in the column will be lost.
  - You are about to drop the column `insuranceTitle` on the `VictimInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReporterInfo" DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "VictimInfo" DROP COLUMN "insuranceTitle",
ADD COLUMN     "phoneNumber" TEXT;
