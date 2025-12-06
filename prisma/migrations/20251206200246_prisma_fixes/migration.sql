/*
  Warnings:

  - You are about to drop the column `caseId` on the `AccidentInfo` table. All the data in the column will be lost.
  - Added the required column `accidentInfoId` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccidentInfo" DROP CONSTRAINT "AccidentInfo_caseId_fkey";

-- AlterTable
ALTER TABLE "AccidentInfo" DROP COLUMN "caseId";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "accidentInfoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_accidentInfoId_fkey" FOREIGN KEY ("accidentInfoId") REFERENCES "AccidentInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
