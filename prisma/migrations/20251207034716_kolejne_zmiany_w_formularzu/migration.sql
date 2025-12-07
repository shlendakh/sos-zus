/*
  Warnings:

  - You are about to drop the column `isDrunk` on the `AccidentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `isVictimFault` on the `AccidentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `isWorkAccident` on the `AccidentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `accidentInfoId` on the `ReporterInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccidentInfo" DROP COLUMN "isDrunk",
DROP COLUMN "isVictimFault",
DROP COLUMN "isWorkAccident";

-- AlterTable
ALTER TABLE "ReporterInfo" DROP COLUMN "accidentInfoId";
