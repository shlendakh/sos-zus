"use server"

import prismaClient from "@/lib/prisma"

export async function fetchCase(id: string) {
  const caseResult = await prismaClient.case.findUniqueOrThrow({
    where: { id },
    include: {
      victimInfo: { include: { address: true } },
      accidentInfo: { include: { witnesses: true } },
      reporterInfo: { include: { address: true } },
      cardOfAccident: true,
    },
  })

  return caseResult
}
