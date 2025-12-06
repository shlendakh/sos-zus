"use server";

import prisma from "@/lib/prisma";
import { formSchema } from "./formSchema";
import type { z } from "zod";

export async function saveCaseForm(formData: FormData) {
  let data: z.infer<typeof formSchema>;

  try {
    data = formSchema.parse(formData);
  } catch (err) {
    console.error("❌ ZOD ERROR", err);
    return { ok: false, error: err };
  }

  try {
    await prisma.case.create({
      data: {
        caseNumber: data.caseNumber,

        payerInfo: {
          create: {
            payerName: data.payerName,
            documentType: data.payerDocumentType,
            documentNumber: data.payerDocumentNumber,
            nip: data.payerNip,
            regon: data.payerRegon ?? null,
            pesel: data.payerPesel ?? null,

            address: {
              create: {
                street: data.payerStreet,
                city: data.payerCity,
                postalCode: data.payerPostalCode,
                country: data.payerCountry,
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
            insuranceTitle: data.insuranceTitle,
            dateOfBirth: new Date(data.victimDateOfBirth),
            placeOfBirth: data.victimPlaceOfBirth,

            address: {
              create: {
                street: data.victimStreet,
                city: data.victimCity,
                postalCode: data.victimPostalCode,
                country: data.victimCountry,
              },
            },
          },
        },

        accidentInfo: {
          create: {
            date: new Date(data.accidentDate),
            nameOfReporter: data.reporterName,
            info: data.accidentInfo,

            isWorkAccident: data.isWorkAccident,
            isVictimFault: data.isVictimFault,

            isDrunk:
              data.substancesStatus === "no"
                ? "no"
                : data.substancesDetails || "yes",
          },
        },
      },
    });

    return { ok: true };
  } catch (err) {
    console.error("❌ DB ERROR", err);
    return { ok: false, error: err };
  }
}
