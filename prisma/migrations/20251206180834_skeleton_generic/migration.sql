/*
  Warnings:

  - You are about to drop the column `description` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the `Accident` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caseNumber` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerInfoId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `victimInfoId` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PERSONAL_ID', 'PASSPORT');

-- DropForeignKey
ALTER TABLE "Accident" DROP CONSTRAINT "Accident_caseId_fkey";

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "cardOfAccidentId" TEXT,
ADD COLUMN     "caseNumber" TEXT NOT NULL,
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "payerInfoId" TEXT NOT NULL,
ADD COLUMN     "victimInfoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Accident";

-- CreateTable
CREATE TABLE "PayerInfo" (
    "id" TEXT NOT NULL,
    "payerName" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "regon" TEXT,
    "pesel" TEXT,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "PayerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VictimInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pesel" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "insuranceTitle" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "VictimInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccidentInfo" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "nameOfReporter" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "isWorkAccident" BOOLEAN NOT NULL,
    "isVictimFault" TEXT NOT NULL,
    "isDrunk" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    CONSTRAINT "AccidentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "file" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Witness" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "accidentInfoId" TEXT NOT NULL,

    CONSTRAINT "Witness_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_payerInfoId_fkey" FOREIGN KEY ("payerInfoId") REFERENCES "PayerInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_victimInfoId_fkey" FOREIGN KEY ("victimInfoId") REFERENCES "VictimInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_cardOfAccidentId_fkey" FOREIGN KEY ("cardOfAccidentId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayerInfo" ADD CONSTRAINT "PayerInfo_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VictimInfo" ADD CONSTRAINT "VictimInfo_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccidentInfo" ADD CONSTRAINT "AccidentInfo_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Witness" ADD CONSTRAINT "Witness_accidentInfoId_fkey" FOREIGN KEY ("accidentInfoId") REFERENCES "AccidentInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
