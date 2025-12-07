"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// ---------------------------
// ZOD SCHEMA
// ---------------------------
const formSchema = z.object({
  firstName: z.string().min(2, "Podaj poprawne imię"),
  lastName: z.string().min(2, "Podaj poprawne nazwisko"),
  damageType: z.string().min(1, "Wybierz typ szkody"),
  description: z.string().min(5, "Opis powinien mieć co najmniej 5 znaków"),
  attachment: z.any().optional(), // ← plik
})

export default function Page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      damageType: "",
      description: "",
      attachment: null,
    },
  })

  // ---------------------------
  // HANDLE SUBMIT
  // ---------------------------
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()

    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    formData.append("damageType", values.damageType)
    formData.append("description", values.description)

    if (values.attachment) {
      formData.append("file", values.attachment)
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    console.log("UPLOAD RESULT:", data)

    alert("Zgłoszenie wysłane!")
  }

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Zgłoszenie szkody</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* IMIĘ */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Wpisz imię" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NAZWISKO */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input placeholder="Wpisz nazwisko" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* RODZAJ SZKODY */}
              <FormField
                control={form.control}
                name="damageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rodzaj szkody</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wypadek">Wypadek</SelectItem>
                        <SelectItem value="choroba">Choroba</SelectItem>
                        <SelectItem value="sprzęt">Uszkodzenie sprzętu</SelectItem>
                        <SelectItem value="inne">Inne</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* OPIS */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opis zdarzenia</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Opisz zdarzenie..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ZAŁĄCZNIK */}
              <FormField
                control={form.control}
                name="attachment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Załącznik (opcjonalnie)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SUBMIT */}
              <Button type="submit" className="w-full">
                Wyślij zgłoszenie
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
