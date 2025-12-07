"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileStep } from "./steps/FileStep"

export function AddNewCase() {
  const steps: { title: string; content: React.ReactNode | null; enabled: boolean }[] = [
    { title: "Załącz plik (opcjonalnie)", content: <FileStep />, enabled: true },
    { title: "Dane płatnika", content: null, enabled: true },
    { title: "Dane poszkodowanego", content: null, enabled: true },
    { title: "Szczegóły zdarzenia", content: null, enabled: true },
    { title: "Świadkowie", content: null, enabled: true },
    { title: "Podsumowanie", content: null, enabled: true },
  ]
  const [currentStep, setCurrentStep] = React.useState(0)

  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log("Submit danych nowego zdarzenia")
  }

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">Dodaj nowe zdarzenie</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Dodaj nowe ZAST</DialogTitle>
          </DialogHeader>

          <div className="mb-4 space-y-2">
            <div className="grid w-full grid-cols-6 text-center">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center justify-end px-2 text-center"
                >
                  <span className="text-muted-foreground text-center text-xs leading-snug">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="bg-muted relative h-1 w-full rounded-full"
              style={{
                left: `${50 / steps.length}%`,
                width: `${100 - 100 / steps.length}%`,
              }}
            >
              <div
                className="bg-primary absolute top-0 left-0 h-1 rounded-full transition-all"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="border-muted-foreground/30 text-muted-foreground flex min-h-[120px] items-center justify-center rounded-md border border-dashed p-4 text-center text-sm">
            {steps[currentStep].content ?? `Zawartość kroku ${currentStep + 1} (placeholder)`}
          </div>

          <DialogFooter className="mt-4 flex items-center justify-between">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Anuluj
              </Button>
            </DialogClose>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Wstecz
              </Button>
              {!isLastStep ? (
                <Button type="button" onClick={handleNext}>
                  Dalej
                </Button>
              ) : (
                <Button type="submit">Zapisz</Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
