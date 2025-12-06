import { file, z } from "zod"
import { zfd } from "zod-form-data"
import { DocumentType } from "../../../prisma/prisma/enums"

export const formSchema = zfd.formData({
  caseNumber: zfd.text(),

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

  victimName: zfd.text(),
  victimDocumentType: zfd.text(z.enum(Object.values(DocumentType))),
  victimDocumentNumber: zfd.text(),
  victimAddressStreet: zfd.text(),
  victimAddressCity: zfd.text(),
  victimAddressPostalCode: zfd.text(),
  victimAddressCountry: zfd.text(),
  victimPesel: zfd.text(),
  victimInsuranceTitle: zfd.text(),
  victimDateOfBirth: zfd.text(z.date()),
  victimPlaceOfBirth: zfd.text(),

  accidentDate: zfd.text(z.date()),
  accidentNameOfReporter: zfd.text(),
  accidentDescription: zfd.text(),
  isWorkAccident: zfd.checkbox(),
  isVictimFault: zfd.text(),
  isDrunk: zfd.text(),

  file: zfd.file(),
})

export type FormSchema = z.infer<typeof formSchema>
