import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  MapPin, 
  CreditCard,  
  Shield,
} from "lucide-react";
import { Prisma } from "../../../../prisma/prisma/client";

// --- Types ---
type UserWithAddress = Prisma.PayerInfoGetPayload<{
  include: { address: true }
}>

interface CaseDetailsSectionOneProps {
  data: UserWithAddress;
}

const PRIMARY_COLOR = "#007834";
const PRIMARY_LIGHT = "#e6f4ed";
const PRIMARY_DARK = "#005a28";

// Komponent dla wiersza danych
const DataRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
    <span className="text-sm text-gray-600 font-medium">
      {label}
    </span>
    <span 
      className={`text-sm font-semibold sm:text-right ${highlight ? 'text-emerald-700' : 'text-gray-900'}`}
    >
      {value}
    </span>
  </div>
);

// Komponent nagłówka sekcji
const SectionHeader = ({ 
  icon: Icon, 
  title,
}: { 
  icon: React.ElementType; 
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0 pb-2 border-b-2" style={{ borderColor: PRIMARY_COLOR }}>
    <div 
      className="p-2 rounded-lg"
      style={{ backgroundColor: PRIMARY_LIGHT }}
    >
      <Icon className="h-5 w-5" style={{ color: PRIMARY_COLOR }} />
    </div>
    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
      {title}
    </h3>
  </div>
);

const CaseDetailsSectionOne = ({ data }: CaseDetailsSectionOneProps) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Nagłówek strony */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: PRIMARY_COLOR }}>
                System Ewidencji Płatników
              </p>
              <h1 className="text-xl font-bold text-gray-900">
                Karta Płatnika Składek
              </h1>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>Nr sprawy: ZUS/2024/00123</p>
            <p>Data wydruku: {new Date().toLocaleDateString('pl-PL')}</p>
          </div>
        </div>

        {/* Główna karta */}
        <Card className="shadow-lg border border-gray-200 overflow-hidden bg-white">
          {/* Nagłówek karty */}
          <CardHeader 
            className="p-6 text-white"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            <CardTitle className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/20">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-white">
                    {data.payerName}
                  </h2>
                  <p className="text-white/80 text-sm mt-0.5">
                    PESEL: {data.pesel} | NIP: {data.nip}
                  </p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Sekcja 1: Dane identyfikacyjne */}
            <SectionHeader icon={User} title="Dane identyfikacyjne" />
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <DataRow label="Imię i nazwisko / Nazwa" value={data.payerName} />
              <DataRow label="PESEL" value={data.pesel ?? "-"} />
              <DataRow label="NIP" value={data.nip} />
              <DataRow label="REGON" value={data.regon ?? "-"} />
            </div>

            {/* Sekcja 2: Dokument tożsamości */}
            <SectionHeader icon={CreditCard} title="Dokument tożsamości" />
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <DataRow label="Typ dokumentu" value={data.documentType} />
              <DataRow label="Seria i numer" value={data.documentNumber} />
            </div>

            {/* Sekcja 3: Adres zamieszkania/siedziby */}
            <SectionHeader icon={MapPin} title="Adres zamieszkania / siedziby" />
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <DataRow label="Ulica i numer" value={data.address.street} />
              <DataRow label="Kod pocztowy" value={data.address.postalCode} />
              <DataRow label="Miejscowość" value={data.address.city} />
            </div>
        </CardContent>
        </Card> 
        {/* Stopka */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
            <p>Dokument wygenerowany z Systemu Ewidencji Płatników Składek</p>
            <p>© {new Date().getFullYear()} Zakład Ubezpieczeń Społecznych</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CaseDetailsSectionOne;
