"use server"

import prismaClient from "@/lib/prisma"

export async function fetchAllCases() {
  const all_cases_result = await prismaClient.case.findMany()

  return all_cases_result
}
