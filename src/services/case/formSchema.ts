import { z } from "zod";
import { zfd } from "zod-form-data";
import { DocumentType } from "../../../prisma/prisma/enums";

export const formSchema = zfd.formData({

  // -------------------------------
  // CASE
  // -------------------------------
  caseNumber: zfd.text(),

  // -------------------------------
  // PAYER INFO
  // -------------------------------
  payerName: zfd.text(),
  payerDocumentType: zfd.text(z.enum(Object.values(DocumentType))),
  payerDocumentNumber: zfd.text(),

  payerAddressStreet: zfd.text(),
  payerAddressCity: zfd.text(),
  payerAddressPostalCode: zfd.text(),
  payerAddressCountry: zfd.text(),

  payerNip: zfd.text(),
  payerRegon: zfd.text().optional(),
  payerPesel: zfd.text().optional(),

  // -------------------------------
  // VICTIM INFO
  // -------------------------------
  victimName: zfd.text(),
  victimDocumentType: zfd.text(z.enum(Object.values(DocumentType))),
  victimDocumentNumber: zfd.text(),

  victimAddressStreet: zfd.text(),
  victimAddressCity: zfd.text(),
  victimAddressPostalCode: zfd.text(),
  victimAddressCountry: zfd.text(),

  victimPesel: zfd.text(),
  victimInsuranceTitle: zfd.text(),
  victimDateOfBirth: zfd.text(),  // date as string YYYY-MM-DD
  victimPlaceOfBirth: zfd.text(),

  // -------------------------------
  // ACCIDENT INFO
  // -------------------------------
  accidentDate: zfd.text(),
  accidentNameOfReporter: zfd.text(),
  accidentDescription: zfd.text(),

  isWorkAccident: zfd.checkbox(),
  isVictimFault: zfd.text(),
  isDrunk: zfd.text(),

  // -------------------------------
  // WITNESSES
  // -------------------------------
  witness: zfd.repeatable(
    z.array(
      z.object({
        name: zfd.text(),
        contact: zfd.text(),
      })
    )
  ),

  // -------------------------------
  // FILE (optional)
  // -------------------------------
  file: zfd.file().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
