"use client";

import Link from "next/link";

export default function GovNavbar() {
  return (
    <header className="w-full bg-[#003078] text-white border-b-4 border-[#1d70b8]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LEWA STRONA — LOGO / HERB */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-[#003078] font-bold flex items-center justify-center">
            RP
          </div>

          <div>
            <h1 className="text-lg font-semibold leading-tight">
              Rzeczpospolita Polska
            </h1>
            <p className="text-sm text-gray-200">
              System Zgłaszania Wypadków
            </p>
          </div>
        </div>

        {/* NAWIGACJA */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:underline underline-offset-2">
            Strona główna
          </Link>

          <Link href="/form" className="hover:underline underline-offset-2">
            Formularz zgłoszenia
          </Link>

          <Link href="/help" className="hover:underline underline-offset-2">
            Pomoc
          </Link>
        </nav>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <button className="text-white text-2xl">☰</button>
        </div>

      </div>
    </header>
  );
}
