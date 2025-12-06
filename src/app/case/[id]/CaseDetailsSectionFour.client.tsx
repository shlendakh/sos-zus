import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, FileText, CreditCard } from "lucide-react";
import DataRow from "./DataRow.client";

interface PayerData {
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  postalCode: string;
  nip: string;
  regon: string;
  pesel: string;
  documentType: "dowód osobisty" | "paszport";
  documentSeries: string;
}

interface PayerIdentificationCardProps {
  data: PayerData;
}


const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-primary/20">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">{title}</h3>
  </div>
);

export const CaseDetailsSectionFour = ({ data }: PayerIdentificationCardProps) => {
  return (
    <Card className="w-full max-w-2xl shadow-lg border-border/50">
      <CardHeader className="bg-primary/5 border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          Dane identyfikacyjne płatnika składek
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Dane osobowe */}
        <div>
          <SectionHeader icon={User} title="Dane osobowe" />
          <DataRow label="Imię i nazwisko" value={`${data.firstName} ${data.lastName}`} />
          <DataRow label="PESEL" value={data.pesel} />
        </div>

        {/* Adres siedziby */}
        <div>
          <SectionHeader icon={MapPin} title="Adres siedziby" />
          <DataRow label="Ulica" value={data.street} />
          <DataRow label="Miasto" value={data.city} />
          <DataRow label="Kod pocztowy" value={data.postalCode} />
        </div>

        {/* Dane rejestrowe */}
        <div>
          <SectionHeader icon={FileText} title="Dane rejestrowe" />
          <DataRow label="NIP" value={data.nip} />
          <DataRow label="REGON" value={data.regon} />
        </div>

        {/* Dokument tożsamości */}
        <div>
          <SectionHeader icon={CreditCard} title="Dokument tożsamości" />
          <DataRow label="Typ dokumentu" value={data.documentType} />
          <DataRow label="Seria i numer" value={data.documentSeries} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseDetailsSectionFour