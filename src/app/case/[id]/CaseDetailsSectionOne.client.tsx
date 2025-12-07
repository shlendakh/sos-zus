import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Building
} from "lucide-react";
import DataTable from "./DataTable.client";
import SectionHeader from "./SectionHeader.client";
import DocumentTypeBadge from "./DocumentTypeBadge.client";
import { Prisma } from "../../../../prisma/prisma/client";

// --- Types ---
type UserWithAddress = Prisma.PayerInfoGetPayload<{
  include: { address: true }
}>

interface CaseDetailsSectionOneProps {
  data: UserWithAddress;
}


const CaseDetailsSectionOne = ({ data }: CaseDetailsSectionOneProps) => {
  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sekcja 1: Dane Płatnika Składek */}
          <Card className="shadow-md border-0 overflow-hidden">
            <SectionHeader 
              icon={Building} 
              title="Dane Płatnika Składek" 
              badge="PayerInfo"
            />
            <CardContent className="p-0">
              <DataTable data={[
                { label: "ID płatnika", value: data.id },
                { label: "Nazwa / Imię i nazwisko", value: data.payerName },
                { label: "Typ dokumentu", value: <DocumentTypeBadge type={data.documentType} /> },
                { label: "Numer dokumentu", value: data.documentNumber },
                { label: "NIP", value: data.nip },
                { label: "REGON", value: data.regon || "—" },
                { label: "PESEL", value: data.pesel || "—" },
              ]} />
            </CardContent>
          </Card>

          {/* Sekcja 2: Adres Płatnika */}
          <Card className="shadow-md border-0 overflow-hidden">
            <SectionHeader 
              icon={MapPin} 
              title="Adres Płatnika" 
              badge="Address"
            />
            <CardContent className="p-0">
              <DataTable data={[
                { label: "Ulica", value: data.address.street },
                { label: "Miasto", value:  data.address.city },
                { label: "Kod pocztowy", value: data.address.postalCode },
                { label: "Kraj", value: data.address.country },
              ]} />
            </CardContent>
          </Card>
        </div>
  );
};
export default CaseDetailsSectionOne;
