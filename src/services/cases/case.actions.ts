"use server"

import prismaClient from "@/lib/prisma"

export async function fetchCase(id: string) {
  const case_result = await prismaClient.case.findUnique({
    where: { id },
    include: {
      payerInfo: { include: { address: true } },
      victimInfo: { include: { address: true } },
      accidentInfo: { include: { witnesses: true } },
      cardOfAccident: true,
    },
  })

  return case_result
}
