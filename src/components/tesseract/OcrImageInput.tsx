"use client"

import { useState } from "react"
import Tesseract from "tesseract.js"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"

type OcrImageInputProps = {
  lang?: string
}

export function OcrImageInput({ lang = "pol" }: OcrImageInputProps) {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  async function handleOcr() {
    if (!file) {
      console.warn("OCR aborted: no file selected")
      return
    }

    console.log("OCR start", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lang,
    })

    setIsLoading(true)
    setError(null)
    setProgress(0)
    setText("")

    const imageUrl = URL.createObjectURL(file)
    console.log("Created image URL for OCR", { imageUrl })

    try {
      console.log("Calling Tesseract.recognize", { lang })

      const { data } = await Tesseract.recognize(imageUrl, lang, {
        langPath: "/tessdata",
        logger: (m) => {
          console.log("Tesseract logger", m)
          if (m.status === "recognizing text" && typeof m.progress === "number") {
            setProgress(m.progress * 100)
          }
        },
      })

      console.log("OCR finished", {
        textLength: data.text?.length,
        confidence: (data as any).confidence,
      })

      setText(data.text || "")
    } catch (err) {
      console.error("OCR error", err)
      setError("Błąd podczas OCR")
    } finally {
      console.log("Cleaning up OCR run, revoking object URL")
      URL.revokeObjectURL(imageUrl)
      setIsLoading(false)
      console.log("OCR end")
    }
  }

  return (
    <Card className="m-auto mt-10 flex w-2/3 flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Obraz do OCR</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null
            setFile(f)
            setText("")
            setError(null)
            setProgress(0)
          }}
        />
      </div>

      {isLoading && (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-sm">Przetwarzanie obrazu…</span>
          <Progress value={progress} />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="button" onClick={handleOcr} disabled={!file || isLoading}>
        Rozpoznaj tekst
      </Button>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Wynik OCR</label>
        <Textarea
          value={text}
          readOnly
          placeholder="Tutaj pojawi się rozpoznany tekst"
          className="min-h-[200px]"
        />
      </div>
    </Card>
  )
}
