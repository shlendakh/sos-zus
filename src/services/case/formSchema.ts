import { z } from "zod"
import { DocumentType } from "../../../prisma/prisma/enums"

export const formSchema = z.object({
  caseNumber: z.string(),

  payerName: z.string(),
  payerDocumentType: z.enum(Object.values(DocumentType)),
  payerDocumentNumber: z.string(),
  payerAddressStreet: z.string(),
  payerAddressCity: z.string(),
  payerAddressPostalCode: z.string(),
  payerAddressCountry: z.string(),
  payerNip: z.string(),
  payerRegon: z.string().optional(),
  payerPesel: z.string().optional(),

  victimName: z.string(),
  victimDocumentType: z.enum(Object.values(DocumentType)),
  victimDocumentNumber: z.string(),
  victimAddressStreet: z.string(),
  victimAddressCity: z.string(),
  victimAddressPostalCode: z.string(),
  victimAddressCountry: z.string(),
  victimPesel: z.string(),
  victimInsuranceTitle: z.string(),
  victimDateOfBirth: z.coerce.date(),
  victimPlaceOfBirth: z.string(),

  accidentDate: z.coerce.date(),
  accidentNameOfReporter: z.string(),
  accidentDescription: z.string(),
  isWorkAccident: z.boolean(),
  isVictimFault: z.string(),
  isDrunk: z.string(),

  witness: z.array(
    z.object({
      name: z.string(),
      contact: z.string(),
    }),
  ),

  file: z.any(),
})

export type FormSchema = z.input<typeof formSchema>
