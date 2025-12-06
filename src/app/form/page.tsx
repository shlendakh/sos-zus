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

import { saveCaseForm } from "./saveCaseForm";

// -------------------------------------------------------
//  GOV.PL style
// -------------------------------------------------------
const govInputClass =
  "border border-gray-500 rounded-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0";

// -------------------------------------------------------
//  ZOD SCHEMA (frontend mirror)
// -------------------------------------------------------
const formSchema = z.object({
  caseNumber: z.string().min(3, "Numer sprawy jest wymagany"),

  payerName: z.string().min(2, "Nazwa płatnika jest wymagana"),
  payerDocumentType: z.enum(["PERSONAL_ID", "PASSPORT"]),
  payerDocumentNumber: z.string().min(3),
  payerNip: z.string().length(10, "NIP musi mieć 10 cyfr"),
  payerRegon: z.string().optional(),
  payerPesel: z.string().optional(),

  payerStreet: z.string().min(2),
  payerCity: z.string().min(2),
  payerPostalCode: z.string().min(3),
  payerCountry: z.string().min(2),

  victimName: z.string().min(2),
  victimPesel: z.string().length(11),
  victimDateOfBirth: z.string(),
  victimPlaceOfBirth: z.string().min(2),
  victimDocumentType: z.enum(["PERSONAL_ID", "PASSPORT"]),
  victimDocumentNumber: z.string().min(3),
  insuranceTitle: z.string().min(3),

  victimStreet: z.string().min(2),
  victimCity: z.string().min(2),
  victimPostalCode: z.string().min(3),
  victimCountry: z.string().min(2),

  accidentDate: z.string(),
  reporterName: z.string().min(2),
  accidentInfo: z.string().min(5),

  isWorkAccident: z.boolean(),
  isVictimFault: z.string().min(2),

  substancesStatus: z.enum(["no", "yes"]),
  substancesDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// -------------------------------------------------------
//  PAGE COMPONENT
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

  // -------------------------------------------------------
  //  FORM SUBMIT — SEND TO BACKEND
  // -------------------------------------------------------
  async function onSubmit(values: FormValues) {
    const fd = new FormData();

    for (const [key, val] of Object.entries(values)) {
      if (typeof val === "boolean") {
        fd.append(key, val ? "true" : "false");
      } else if (val !== undefined && val !== null) {
        fd.append(key, val);
      }
    }

    await saveCaseForm(fd);

    alert("Zgłoszenie zostało zapisane w bazie danych.");
  }

  // -------------------------------------------------------
  //  RENDER
  // -------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <h1 className="text-3xl font-bold text-gray-900">Formularz zgłoszenia wypadku</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">

          {/* -------------------------------------------------
              I. DANE SPRAWY
          --------------------------------------------------*/}
          <Card className="border border-gray-300 rounded-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold">I. Dane sprawy</CardTitle>
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
              <CardTitle className="text-xl font-bold">II. Dane płatnika</CardTitle>
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

              {/* OPTIONAL */}
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
              <CardTitle className="text-xl font-bold">
                III. Dane poszkodowanego
              </CardTitle>
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
              <CardTitle className="text-xl font-bold">
                IV. Informacje o zdarzeniu
              </CardTitle>
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
                        <Textarea rows={3} {...field} className={govInputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            </CardContent>
          </Card>

          {/* SUBMIT */}
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
