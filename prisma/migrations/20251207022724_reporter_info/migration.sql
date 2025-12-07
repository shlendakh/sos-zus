/*
  Warnings:

  - Added the required column `reporterInfoId` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "reporterInfoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_reporterInfoId_fkey" FOREIGN KEY ("reporterInfoId") REFERENCES "ReporterInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
