import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/components/Providers"

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
