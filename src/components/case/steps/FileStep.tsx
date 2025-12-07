"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FileStep() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Załącz plik ze zdarzeniem (opcjonalnie)</Label>
        <Input type="file" id="file" name="file" />
      </div>
      <p className="text-muted-foreground text-sm">
        Możesz załączyć plik w formacie PDF lub obraz (JPG, PNG) zawierający szczegóły zdarzenia.
      </p>
    </div>
  )
}
