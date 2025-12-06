"use server"
import z from "zod"
import { formSchema } from "./formSchema"
import type { FormSchema } from "./formSchema"
import prismaClient from "@/lib/prisma"

export async function saveCaseForm(args: z.input<typeof formSchema>) {
  const data = formSchema.parse(args)

  console.log("Parsed form data:", data)

  await prismaClient.case.create({
    data: {
      caseNumber: data.caseNumber,
      payerInfo: {
        create: {
          payerName: data.payerName,
          documentType: data.payerDocumentType,
          documentNumber: data.payerDocumentNumber,
          nip: data.payerNip,
          regon: data.payerRegon,
          pesel: data.payerPesel,
          address: {
            create: {
              street: data.payerAddressStreet,
              city: data.payerAddressCity,
              postalCode: data.payerAddressPostalCode,
              country: data.payerAddressCountry,
            },
          },
        },
      },
      victimInfo: {
        create: {
          name: data.victimName,
          documentType: data.victimDocumentType,
          documentNumber: data.victimDocumentNumber,
          pesel: data.victimPesel,
          insuranceTitle: data.victimInsuranceTitle,
          dateOfBirth: data.victimDateOfBirth,
          placeOfBirth: data.victimPlaceOfBirth,
          address: {
            create: {
              street: data.victimAddressStreet,
              city: data.victimAddressCity,
              postalCode: data.victimAddressPostalCode,
              country: data.victimAddressCountry,
            },
          },
        },
      },
      accidentInfo: {
        create: {
          date: data.accidentDate,
          nameOfReporter: data.accidentNameOfReporter,
          info: data.accidentDescription,
          witnesses: {
            create: [],
          },
          isWorkAccident: data.isWorkAccident,
          isVictimFault: data.isVictimFault,
          isDrunk: data.isDrunk,
        },
      },
    },
  })
}
