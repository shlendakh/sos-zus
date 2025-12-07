/*
  Warnings:

  - You are about to drop the column `nameOfReporter` on the `AccidentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `payerInfoId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `VictimInfo` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Witness` table. All the data in the column will be lost.
  - You are about to drop the `PayerInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authority` to the `AccidentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `injuries` to the `AccidentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `AccidentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workEndAt` to the `AccidentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workStartAt` to the `AccidentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `VictimInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Witness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Witness` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'CORESSPONDENCE', 'BUSINESS', 'CHILD_CARE');

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_payerInfoId_fkey";

-- DropForeignKey
ALTER TABLE "PayerInfo" DROP CONSTRAINT "PayerInfo_addressId_fkey";

-- DropForeignKey
ALTER TABLE "VictimInfo" DROP CONSTRAINT "VictimInfo_addressId_fkey";

-- AlterTable
ALTER TABLE "AccidentInfo" DROP COLUMN "nameOfReporter",
ADD COLUMN     "authority" TEXT NOT NULL,
ADD COLUMN     "injuries" TEXT NOT NULL,
ADD COLUMN     "isMachineAtestated" BOOLEAN,
ADD COLUMN     "isMachineFixedAsset" BOOLEAN,
ADD COLUMN     "isMedicalAssistance" TEXT,
ADD COLUMN     "machineOperations" TEXT,
ADD COLUMN     "place" TEXT NOT NULL,
ADD COLUMN     "workEndAt" INTEGER NOT NULL,
ADD COLUMN     "workStartAt" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "type" "AddressType" NOT NULL;

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "payerInfoId";

-- AlterTable
ALTER TABLE "VictimInfo" DROP COLUMN "addressId",
ADD COLUMN     "surname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Witness" DROP COLUMN "contact",
ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- DropTable
DROP TABLE "PayerInfo";

-- CreateTable
CREATE TABLE "ReporterInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "pesel" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT,
    "accidentInfoId" TEXT NOT NULL,

    CONSTRAINT "ReporterInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AddressToVictimInfo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AddressToVictimInfo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AddressToReporterInfo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AddressToReporterInfo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AddressToVictimInfo_B_index" ON "_AddressToVictimInfo"("B");

-- CreateIndex
CREATE INDEX "_AddressToReporterInfo_B_index" ON "_AddressToReporterInfo"("B");

-- AddForeignKey
ALTER TABLE "Witness" ADD CONSTRAINT "Witness_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToVictimInfo" ADD CONSTRAINT "_AddressToVictimInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToVictimInfo" ADD CONSTRAINT "_AddressToVictimInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "VictimInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToReporterInfo" ADD CONSTRAINT "_AddressToReporterInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToReporterInfo" ADD CONSTRAINT "_AddressToReporterInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "ReporterInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
