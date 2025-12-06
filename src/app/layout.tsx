import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SOS ZUS | System obsługi szkód ZUS",
  description: "Aplikacja do zarządzania i obsługi szkód w Zakładzie Ubezpieczeń Społecznych.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
