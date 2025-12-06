"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// -------------------------------------------------------
//  RZĄDOWY STYL INPUT (GOV.PL)
// -------------------------------------------------------
const govInputClass =
  "border border-gray-500 rounded-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0";

// -------------------------------------------------------
//  ZOD SCHEMA — POLSKIE KOMUNIKATY BŁĘDÓW
// -------------------------------------------------------
const formSchema = z.object({
  caseNumber: z
    .string()
    .min(3, "Numer sprawy musi zawierać co najmniej 3 znaki")
    .nonempty("Numer sprawy jest wymagany"),

  payerName: z
    .string()
    .min(2, "Nazwa płatnika musi zawierać co najmniej 2 znaki")
    .nonempty("Nazwa płatnika jest wymagana"),

  payerDocumentType: z.enum(["PERSONAL_ID", "PASSPORT"], {
    errorMap: () => ({ message: "Wybierz typ dokumentu" }),
  }),

  payerDocumentNumber: z
    .string()
    .min(3, "Numer dokumentu jest za krótki")
    .nonempty("Numer dokumentu jest wymagany"),

  payerNip: z
    .string()
    .length(10, "NIP musi zawierać 10 cyfr")
    .nonempty("NIP jest wymagany"),

  payerRegon: z.string().optional(),
  payerPesel: z.string().optional(),

  payerStreet: z
    .string()
    .min(2, "Ulica jest za krótka")
    .nonempty("Ulica jest wymagana"),

  payerCity: z
    .string()
    .min(2, "Miasto jest za krótkie")
    .nonempty("Miasto jest wymagane"),

  payerPostalCode: z
    .string()
    .min(3, "Kod pocztowy jest nieprawidłowy")
    .nonempty("Kod pocztowy jest wymagany"),

  payerCountry: z
    .string()
    .min(2, "Kraj jest za krótki")
    .nonempty("Kraj jest wymagany"),

  victimName: z
    .string()
    .min(2, "Imię i nazwisko jest za krótkie")
    .nonempty("Imię i nazwisko jest wymagane"),

  victimPesel: z
    .string()
    .length(11, "PESEL musi zawierać 11 cyfr")
    .nonempty("PESEL jest wymagany"),

  victimDateOfBirth: z.string().nonempty("Data urodzenia jest wymagana"),

  victimPlaceOfBirth: z
    .string()
    .min(2, "Miejsce urodzenia jest za krótkie")
    .nonempty("Miejsce urodzenia jest wymagane"),

  victimDocumentType: z.enum(["PERSONAL_ID", "PASSPORT"], {
    errorMap: () => ({ message: "Wybierz typ dokumentu" }),
  }),

  victimDocumentNumber: z
    .string()
    .min(3, "Numer dokumentu jest za krótki")
    .nonempty("Numer dokumentu jest wymagany"),

  insuranceTitle: z
    .string()
    .min(3, "Tytuł ubezpieczenia jest za krótki")
    .nonempty("Tytuł ubezpieczenia jest wymagany"),

  victimStreet: z
    .string()
    .min(2, "Ulica jest za krótka")
    .nonempty("Ulica jest wymagana"),

  victimCity: z
    .string()
    .min(2, "Miasto jest za krótkie")
    .nonempty("Miasto jest wymagane"),

  victimPostalCode: z
    .string()
    .min(3, "Kod pocztowy jest nieprawidłowy")
    .nonempty("Kod pocztowy jest wymagany"),

  victimCountry: z
    .string()
    .min(2, "Kraj jest za krótki")
    .nonempty("Kraj jest wymagany"),

  accidentDate: z.string().nonempty("Data zdarzenia jest wymagana"),

  reporterName: z
    .string()
    .min(2, "Nazwa zgłaszającego jest za krótka")
    .nonempty("Zgłaszający jest wymagany"),

  accidentInfo: z
    .string()
    .min(5, "Opis zdarzenia jest zbyt krótki")
    .nonempty("Opis zdarzenia jest wymagany"),

  isWorkAccident: z.boolean(),
  isVictimFault: z
    .string()
    .nonempty("Informacja o winie poszkodowanego jest wymagana"),

  substancesStatus: z.enum(["no", "yes"], {
    errorMap: () => ({ message: "Wybierz jedną z opcji" }),
  }),

  substancesDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// -------------------------------------------------------
//  PAGE
// -------------------------------------------------------
export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseNumber: "",
      payerName: "",
      payerDocumentType: "PERSONAL_ID",
      payerDocumentNumber: "",
      payerNip: "",
      payerRegon: "",
      payerPesel: "",
      payerStreet: "",
      payerCity: "",
      payerPostalCode: "",
      payerCountry: "Polska",
      victimName: "",
      victimPesel: "",
      victimDateOfBirth: "",
      victimPlaceOfBirth: "",
      victimDocumentType: "PERSONAL_ID",
      victimDocumentNumber: "",
      insuranceTitle: "",
      victimStreet: "",
      victimCity: "",
      victimPostalCode: "",
      victimCountry: "Polska",
      accidentDate: "",
      reporterName: "",
      accidentInfo: "",
      isWorkAccident: false,
      isVictimFault: "",
      substancesStatus: "no",
      substancesDetails: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("FORMULARZ →", values);
    alert("Zgłoszenie zostało poprawnie wysłane.");
  }

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <h1 className="text-3xl font-bold text-gray-800">
        Formularz zgłoszenia wypadku
      </h1>
      <p className="text-gray-700">
        Wypełnij wszystkie pola zgodnie z prawdą. Pola obowiązkowe muszą być
        uzupełnione.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">

          {/* -------------------------------------------------
              I. DANE SPRAWY
          --------------------------------------------------*/}
          <Card className="border border-gray-300 rounded-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                I. Dane sprawy
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Podstawowe informacje identyfikacyjne zgłoszenia.
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <FormField
                control={form.control}
                name="caseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numer sprawy</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>
          </Card>

          {/* -------------------------------------------------
              II. DANE PŁATNIKA
          --------------------------------------------------*/}
          <Card className="border border-gray-300 rounded-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                II. Dane płatnika
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Informacje o płatniku składek oraz jego adres.
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <FormField
                control={form.control}
                name="payerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa płatnika</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerDocumentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typ dokumentu</FormLabel>
                    <FormControl>
                      <select
                        className={`${govInputClass} p-2`}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="PERSONAL_ID">Dowód osobisty</option>
                        <option value="PASSPORT">Paszport</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerDocumentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numer dokumentu</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerNip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerRegon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>REGON (opcjonalnie)</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerPesel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PESEL (opcjonalnie)</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Separator className="col-span-2" />

              <FormField
                control={form.control}
                name="payerStreet"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Ulica i numer</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miasto</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kod pocztowy</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kraj</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>
          </Card>

          {/* -------------------------------------------------
              III. DANE POSZKODOWANEGO
          --------------------------------------------------*/}
          <Card className="border border-gray-300 rounded-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                III. Dane poszkodowanego
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Informacje osobowe i adres poszkodowanego.
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <FormField
                control={form.control}
                name="victimName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię i nazwisko</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimPesel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PESEL</FormLabel>
                    <FormControl>
                      <Input maxLength={11} {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimDateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data urodzenia</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimPlaceOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miejsce urodzenia</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimDocumentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typ dokumentu</FormLabel>
                    <FormControl>
                      <select
                        className={`${govInputClass} p-2`}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="PERSONAL_ID">Dowód osobisty</option>
                        <option value="PASSPORT">Paszport</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimDocumentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numer dokumentu</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="col-span-2" />

              <FormField
                control={form.control}
                name="victimStreet"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Ulica i numer</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miasto</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kod pocztowy</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="victimCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kraj</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>
          </Card>

          {/* -------------------------------------------------
              IV. INFORMACJE O ZDARZENIU
          --------------------------------------------------*/}
          <Card className="border border-gray-300 rounded-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                IV. Informacje o zdarzeniu
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Szczegółowy opis okoliczności zdarzenia.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormField
                  control={form.control}
                  name="accidentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data zdarzenia</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className={govInputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reporterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zgłaszający</FormLabel>
                      <FormControl>
                        <Input {...field} className={govInputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <FormField
                control={form.control}
                name="accidentInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opis zdarzenia</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isWorkAccident"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Czy był to wypadek przy pracy?</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVictimFault"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Czy poszkodowany ponosi winę?</FormLabel>
                    <FormControl>
                      <Input {...field} className={govInputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* ALKOHOL + NARKOTYKI */}
              <FormField
                control={form.control}
                name="substancesStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Czy poszkodowany był pod wpływem alkoholu lub środków odurzających?
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2 mt-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="no"
                            checked={field.value === "no"}
                            onChange={() => field.onChange("no")}
                          />
                          Nie stwierdzono
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="yes"
                            checked={field.value === "yes"}
                            onChange={() => field.onChange("yes")}
                          />
                          Stwierdzono — podać fakty
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("substancesStatus") === "yes" && (
                <FormField
                  control={form.control}
                  name="substancesDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis stwierdzonych faktów</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          {...field}
                          className={govInputClass}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            </CardContent>
          </Card>

          {/* -------------------------------------------------
              SUBMIT
          --------------------------------------------------*/}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-8 py-5 text-lg bg-blue-700 hover:bg-blue-800 rounded-none"
            >
              Wyślij zgłoszenie
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
}
