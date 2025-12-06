"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// -------------------------------------------
// ZOD SCHEMA — ZGODNE Z BAZĄ + KARTA WYPADKU
// -------------------------------------------
const formSchema = z.object({
  // CASE
  caseNumber: z.string().min(3),

  // PAYER INFO
  payerName: z.string().min(2),
  payerDocumentType: z.enum(["PERSONAL_ID", "PASSPORT"]),
  payerDocumentNumber: z.string().min(3),
  payerNip: z.string().min(10),
  payerRegon: z.string().optional(),
  payerPesel: z.string().optional(),

  // PAYER ADDRESS
  payerStreet: z.string().min(2),
  payerCity: z.string().min(2),
  payerPostalCode: z.string().min(3),
  payerCountry: z.string().min(2),

  // VICTIM INFO
  victimName: z.string().min(2),
  victimPesel: z.string().length(11),
  victimDateOfBirth: z.string(),
  victimPlaceOfBirth: z.string().min(2),
  victimDocumentType: z.enum(["PERSONAL_ID", "PASSPORT"]),
  victimDocumentNumber: z.string().min(3),
  insuranceTitle: z.string().min(3),

  // VICTIM ADDRESS
  victimStreet: z.string().min(2),
  victimCity: z.string().min(2),
  victimPostalCode: z.string().min(3),
  victimCountry: z.string().min(2),

  // ACCIDENT INFO
  accidentDate: z.string(),
  reporterName: z.string().min(2),
  accidentInfo: z.string().min(5),

  isWorkAccident: z.boolean(),
  isVictimFault: z.string(),

  // NOWE POLE – zgodne z *Kartą wypadku*
  substancesStatus: z.enum(["no", "yes"]),
  substancesDetails: z.string().optional(),

  attachment: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// -------------------------------------------
// PAGE COMPONENT
// -------------------------------------------
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

      attachment: null,
    },
  });

  function onSubmit(values: FormValues) {
    console.log("FORM DATA →", values);
    alert("Zgłoszenie wysłane!");
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Formularz zgłoszenia szkody</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="single" collapsible>

            {/* ===================================================
                SEKCJA 1 — DANE SPRAWY
            =================================================== */}
            <AccordionItem value="case">
              <AccordionTrigger>1. Dane sprawy</AccordionTrigger>
              <AccordionContent className="space-y-4">

                <FormField
                  control={form.control}
                  name="caseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numer sprawy</FormLabel>
                      <FormControl>
                        <Input placeholder="np. KS-2024/01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            {/* ===================================================
                SEKCJA 2 — DANE PŁATNIKA
            =================================================== */}
            <AccordionItem value="payer">
              <AccordionTrigger>2. Dane płatnika</AccordionTrigger>
              <AccordionContent className="space-y-4">

                <FormField
                  control={form.control}
                  name="payerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa płatnika</FormLabel>
                      <FormControl>
                        <Input placeholder="Firma lub osoba prywatna" {...field} />
                      </FormControl>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Dokument" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PERSONAL_ID">Dowód osobisty</SelectItem>
                            <SelectItem value="PASSPORT">Paszport</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Input {...field} />
                      </FormControl>
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
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payerRegon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>REGON (opcjonalnie)</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payerPesel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PESEL (opcjonalnie)</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                {/* ADRES PŁATNIKA */}
                <h3 className="font-semibold pt-4">Adres płatnika</h3>

                <FormField
                  control={form.control}
                  name="payerStreet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ulica</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payerCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Miasto</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payerPostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kod pocztowy</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payerCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kraj</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

              </AccordionContent>
            </AccordionItem>

            {/* ===================================================
                SEKCJA 3 — DANE POSZKODOWANEGO
            =================================================== */}
            <AccordionItem value="victim">
              <AccordionTrigger>3. Dane poszkodowanego</AccordionTrigger>
              <AccordionContent className="space-y-4">

                <FormField
                  control={form.control}
                  name="victimName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imię i nazwisko</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="victimPesel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PESEL</FormLabel>
                      <FormControl><Input maxLength={11} {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="victimDateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data urodzenia</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="victimPlaceOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Miejsce urodzenia</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Dokument" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PERSONAL_ID">Dowód osobisty</SelectItem>
                            <SelectItem value="PASSPORT">Paszport</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="victimDocumentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numer dokumentu</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                {/* ADRES POSZKODOWANEGO */}
                <h3 className="font-semibold pt-4">Adres poszkodowanego</h3>

                <FormField
                  control={form.control}
                  name="victimStreet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ulica</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="victimCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Miasto</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="victimPostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kod pocztowy</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="victimCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kraj</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

              </AccordionContent>
            </AccordionItem>

            {/* ===================================================
                SEKCJA 4 — INFORMACJE O ZDARZENIU
            =================================================== */}
            <AccordionItem value="accident">
              <AccordionTrigger>4. Informacje o zdarzeniu</AccordionTrigger>
              <AccordionContent className="space-y-4">

                <FormField
                  control={form.control}
                  name="accidentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data zdarzenia</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reporterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zgłaszający</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accidentInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis zdarzenia</FormLabel>
                      <FormControl><Textarea rows={3} {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isWorkAccident"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wypadek przy pracy?</FormLabel>
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
                      <FormLabel>Czy poszkodowany zawinił?</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                {/* NOWE POLE — ZGODNE Z KARTĄ WYPADKU */}
                <FormField
                  control={form.control}
                  name="substancesStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Czy stwierdzono, że poszkodowany był w stanie nietrzeźwości
                        lub pod wpływem środków odurzających / psychotropowych?
                      </FormLabel>

                      <FormControl>
                        <div className="flex flex-col gap-2">
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
                            Stwierdzono – podać fakty
                          </label>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DODATKOWE POLE TYLKO GDY STWIERDZONO */}
                {form.watch("substancesStatus") === "yes" && (
                  <FormField
                    control={form.control}
                    name="substancesDetails"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Opis stwierdzonych faktów</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Opisz jakie substancje stwierdzono i w jaki sposób wpłynęły na zdarzenie"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* SUBMIT */}
          <Button type="submit" className="w-full">
            Wyślij zgłoszenie
          </Button>

        </form>
      </Form>
    </div>
  );
}
