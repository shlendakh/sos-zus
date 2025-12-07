import { file, z } from "zod"
import { DocumentType } from "../../../prisma/prisma/enums"

export const formSchema = z.object({
  caseNumber: z.string(),
  file: file().optional(),

  // Victim Info
  victimInfo: z.object({
    name: z.string().min(1, "Imię jest wymagane"),
    surname: z.string().min(1, "Nazwisko jest wymagane"),
    pesel: z.string().min(11, "PESEL musi mieć 11 znaków").max(11, "PESEL musi mieć 11 znaków"),
    dateOfBirth: z.date(),
    placeOfBirth: z.string().min(1, "Miejsce urodzenia jest wymagane"),
    documentType: z.enum(Object.values(DocumentType)),
    documentNumber: z.string().min(1, "Numer dokumentu jest wymagany"),
  }),
  victimHomeAddress: z.object({
    street: z.string().min(1, "Ulica jest wymagana"),
    city: z.string().min(1, "Miasto jest wymagane"),
    district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
    postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
    country: z.string().min(1, "Kraj jest wymagany"),
    type: z.literal("HOME"),
  }),
  victimCorrespondenceAddress: z
    .object({
      street: z.string().min(1, "Ulica jest wymagana"),
      city: z.string().min(1, "Miasto jest wymagane"),
      district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
      postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
      country: z.string().min(1, "Kraj jest wymagany"),
      type: z.literal("HOME"),
    })
    .optional(),
  victimBusinessAddress: z
    .object({
      street: z.string().min(1, "Ulica jest wymagana"),
      city: z.string().min(1, "Miasto jest wymagane"),
      district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
      postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
      country: z.string().min(1, "Kraj jest wymagany"),
      type: z.literal("BUSINESS"),
    })
    .optional(),
  victimChildCareAddress: z
    .object({
      street: z.string().min(1, "Ulica jest wymagana"),
      city: z.string().min(1, "Miasto jest wymagane"),
      district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
      postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
      country: z.string().min(1, "Kraj jest wymagany"),
      type: z.literal("CHILD_CARE"),
    })
    .optional(),
  victimLastKnownAddress: z
    .object({
      street: z.string().min(1, "Ulica jest wymagana"),
      city: z.string().min(1, "Miasto jest wymagane"),
      district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
      postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
      country: z.string().min(1, "Kraj jest wymagany"),
      type: z.literal("LAST_KNOWN"),
    })
    .optional(),

  // Reporter Info
  reporterInfo: z.object({
    name: z.string().min(1, "Imię jest wymagane"),
    surname: z.string().min(1, "Nazwisko jest wymagane"),
    pesel: z.string().min(11, "PESEL musi mieć 11 znaków").max(11, "PESEL musi mieć 11 znaków"),
    dateOfBirth: z.date(),
  }),
  reporterHomeAddress: z.object({
    street: z.string().min(1, "Ulica jest wymagana"),
    city: z.string().min(1, "Miasto jest wymagane"),
    district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
    postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
    country: z.string().min(1, "Kraj jest wymagany"),
    type: z.literal("HOME"),
  }),
  reporterLastKnownAddress: z
    .object({
      street: z.string().min(1, "Ulica jest wymagana"),
      city: z.string().min(1, "Miasto jest wymagane"),
      district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
      postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
      country: z.string().min(1, "Kraj jest wymagany"),
      type: z.literal("LAST_KNOWN"),
    })
    .optional(),
  reporterBusinessAddress: z
    .object({
      street: z.string().min(1, "Ulica jest wymagana"),
      city: z.string().min(1, "Miasto jest wymagane"),
      district: z.string().min(1, "Gmina/dzielnica jest wymagana"),
      postalCode: z.string().min(1, "Kod pocztowy jest wymagany"),
      country: z.string().min(1, "Kraj jest wymagany"),
      type: z.literal("BUSINESS"),
    })
    .optional(),

  // Accident Info
  accidentInfo: z.object({
    date: z.date(),
    place: z.string().min(1, "Miejsce zdarzenia jest wymagane"),
    workStartAt: z.number().min(0).max(23),
    workEndAt: z.number().min(0).max(23),
    injuries: z.string().min(1, "Opis obrażeń jest wymagany"),
    info: z.string().min(1, "Wszystkie szczegóły dotyczące wypadku są wymagane"),

    isMedicalAssistance: z.string().optional(),
    authority: z.string().min(1, "Organ, który prowadzi postępowanie jest wymagany"),
    machineOperations: z.string().optional(),
    isMachineAtestated: z.boolean().optional(),
    isMachineFixedAsset: z.boolean().optional(),
  }),
})

export type FormSchema = z.input<typeof formSchema>
