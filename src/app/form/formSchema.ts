import { z } from "zod";
import { zfd } from "zod-form-data";
import { DocumentType } from "../../../prisma/prisma/enums";

export const formSchema = zfd.formData({
  caseNumber: zfd.text(),

  // PAYER
  payerName: zfd.text(),
  payerDocumentType: zfd.text(z.enum(Object.values(DocumentType))),
  payerDocumentNumber: zfd.text(),

  payerStreet: zfd.text(),
  payerCity: zfd.text(),
  payerPostalCode: zfd.text(),
  payerCountry: zfd.text(),

  payerNip: zfd.text(),
  payerRegon: zfd.text().optional(),
  payerPesel: zfd.text().optional(),

  // VICTIM
  victimName: zfd.text(),
  victimPesel: zfd.text(),
  victimDateOfBirth: zfd.text(),
  victimPlaceOfBirth: zfd.text(),

  victimDocumentType: zfd.text(z.enum(Object.values(DocumentType))),
  victimDocumentNumber: zfd.text(),
  insuranceTitle: zfd.text(),

  victimStreet: zfd.text(),
  victimCity: zfd.text(),
  victimPostalCode: zfd.text(),
  victimCountry: zfd.text(),

  // ACCIDENT
  accidentDate: zfd.text(),
  reporterName: zfd.text(),
  accidentInfo: zfd.text(),

  isWorkAccident: zfd.checkbox(),
  isVictimFault: zfd.text(),

  substancesStatus: zfd.text(z.enum(["no", "yes"])),
  substancesDetails: zfd.text().optional(),

  // Optional file
  file: zfd.file().optional(),
});
