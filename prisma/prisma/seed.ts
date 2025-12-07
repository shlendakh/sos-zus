import prisma from "@/lib/prisma"
import { DocumentType } from "./enums"

async function main() {
  console.log("Start seeding...")

  // 1. Tworzenie Adresów (Addresses)
  // Muszą być utworzone jako pierwsze, bo są kluczem obcym dla PayerInfo i VictimInfo
  const addr1 = await prisma.address.create({
    data: { street: "ul. Długa 15", city: "Kraków", postalCode: "30-001", country: "Polska" },
  })
  const addr2 = await prisma.address.create({
    data: {
      street: "Al. Niepodległości 10",
      city: "Warszawa",
      postalCode: "00-001",
      country: "Polska",
    },
  })
  const addr3 = await prisma.address.create({
    data: { street: "ul. Leśna 3", city: "Gdańsk", postalCode: "80-800", country: "Polska" },
  })
  const addr4 = await prisma.address.create({
    data: { street: "Plac Wolności 5", city: "Wrocław", postalCode: "50-500", country: "Polska" },
  })

  // 3. Tworzenie Płatników (PayerInfo)
  const payer1 = await prisma.payerInfo.create({
    data: {
      payerName: "Jan Kowalski",
      documentType: DocumentType.PERSONAL_ID, // Użycie enum z Prisma Client
      documentNumber: "ABC123456",
      nip: "1234567890",
      pesel: "70010112345",
      addressId: addr1.id,
    },
  })

  const payer2 = await prisma.payerInfo.create({
    data: {
      payerName: "Firma Testowa Sp. z o.o.",
      documentType: DocumentType.PASSPORT,
      documentNumber: "E-123456",
      nip: "9876543210",
      regon: "123456789",
      addressId: addr2.id,
    },
  })

  // 4. Tworzenie Poszkodowanych (VictimInfo)
  const victim1 = await prisma.victimInfo.create({
    data: {
      name: "Anna Zaborowska",
      pesel: "85050554321",
      dateOfBirth: new Date("1985-05-05T00:00:00.000Z"),
      placeOfBirth: "Poznań",
      documentType: DocumentType.PERSONAL_ID,
      documentNumber: "XYZ789012",
      insuranceTitle: "Ubezpieczenie OC",
      addressId: addr3.id,
    },
  })

  const victim2 = await prisma.victimInfo.create({
    data: {
      name: "Marek Ziółkowski",
      pesel: "92112223456",
      dateOfBirth: new Date("1992-11-22T00:00:00.000Z"),
      placeOfBirth: "Warszawa",
      documentType: DocumentType.PASSPORT,
      documentNumber: "QWE112233",
      insuranceTitle: "Ubezpieczenie na życie",
      addressId: addr4.id,
    },
  })

  // 5. Tworzenie Informacji o Wypadkach (AccidentInfo) z zagnieżdżonym tworzeniem Świadków (Witness)
  // 💡 To rozwiązuje problem P2003, ponieważ świadkowie są tworzeni razem z istniejącym już kluczem obcym (acc1.id)
  const acc1 = await prisma.accidentInfo.create({
    data: {
      date: new Date("2025-10-15T10:30:00.000Z"),
      nameOfReporter: "Piotr Krawczyk",
      info: "Kolizja na skrzyżowaniu. Nieustąpienie pierwszeństwa.",
      isWorkAccident: false,
      isVictimFault: "Nie",
      isDrunk: "Nie",
      witnesses: {
        create: [
          { name: "Anna Kowalska", contact: "500-100-200" },
          { name: "Piotr Nowak", contact: "600-200-300" },
        ],
      },
    },
    // Włączenie świadków do zwróconego obiektu, choć nie jest to wymagane do seedowania
    include: {
      witnesses: true,
    },
  })

  const acc2 = await prisma.accidentInfo.create({
    data: {
      date: new Date("2025-11-20T15:45:00.000Z"),
      nameOfReporter: "Ewa Łukomska",
      info: "Wypadek w pracy - poślizgnięcie na mokrej posadzce.",
      isWorkAccident: true,
      isVictimFault: "Częściowo (brak odpowiedniego obuwia)",
      isDrunk: "Nie",
      witnesses: {
        create: [{ name: "Krzysztof Zając", contact: "700-300-400" }],
      },
    },
  })

  // 6. Tworzenie 10 Spraw (Case)
  const casesToCreate = [
    {
      caseNumber: "2025/10/001",
      comments: "Sprawa w toku, oczekiwanie na ekspertyzę techniczną.",
      payerInfoId: payer1.id,
      victimInfoId: victim1.id,
      accidentInfoId: acc1.id,
    },
    {
      caseNumber: "2025/11/002",
      comments: "Wypadek przy pracy, zgłoszenie do ZUS.",
      payerInfoId: payer2.id,
      victimInfoId: victim2.id,
      accidentInfoId: acc2.id,
    },
    {
      caseNumber: "2025/11/003",
      comments: "Prosta kolizja, szybka likwidacja szkody.",
      payerInfoId: payer1.id,
      victimInfoId: victim2.id,
      accidentInfoId: acc1.id,
    },
    {
      caseNumber: "2025/12/004",
      comments: null,
      payerInfoId: payer2.id,
      victimInfoId: victim1.id,
      accidentInfoId: acc2.id,
    },
    {
      caseNumber: "2025/12/005",
      comments: "Odmowa wypłaty ze względu na stan nietrzeźwości poszkodowanego.",
      payerInfoId: payer1.id,
      victimInfoId: victim1.id,
      accidentInfoId: acc1.id,
    },
    {
      caseNumber: "2025/12/006",
      comments: "Brak świadków, sprawa wymaga dodatkowego dochodzenia.",
      payerInfoId: payer2.id,
      victimInfoId: victim2.id,
      accidentInfoId: acc2.id,
    },
    {
      caseNumber: "2026/01/007",
      comments: "Sprawa zamknięta. Wypłacono odszkodowanie.",
      payerInfoId: payer1.id,
      victimInfoId: victim2.id,
      accidentInfoId: acc1.id,
    },
    {
      caseNumber: "2026/01/008",
      comments: "Oczekiwana korekta danych adresowych poszkodowanego.",
      payerInfoId: payer2.id,
      victimInfoId: victim1.id,
      accidentInfoId: acc2.id,
    },
    {
      caseNumber: "2026/02/009",
      comments: "Duża szkoda majątkowa, konieczność wyceny przez rzeczoznawcę.",
      payerInfoId: payer1.id,
      victimInfoId: victim2.id,
      accidentInfoId: acc1.id,
    },
    {
      caseNumber: "2026/02/010",
      comments: "Ostatnia sprawa w kwartale.",
      payerInfoId: payer2.id,
      victimInfoId: victim1.id,
      accidentInfoId: acc2.id,
    },
  ]

  for (const c of casesToCreate) {
    await prisma.case.create({ data: c })
  }

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
