import { Card, CardContent } from "@/components/ui/card"
import { Heart, MapPin } from "lucide-react"
import DataTable from "./DataTable.client"
import SectionHeader from "./SectionHeader.client"
import DocumentTypeBadge from "./DocumentTypeBadge.client"
import { Prisma } from "../../../../prisma/prisma/client"

type VictimWithAddress = Prisma.VictimInfoGetPayload<{
  include: { address: true }
}>
interface CaseDetailsSectionTwoProps {
  data: VictimWithAddress
}

export const CaseDetailsSectionTwo = ({ data }: CaseDetailsSectionTwoProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div>
      <Card className="overflow-hidden border-0 shadow-md">
        <SectionHeader icon={Heart} title="Dane Poszkodowanego" badge="VictimInfo" />
        <CardContent className="p-0">
          <DataTable
            data={[
              { label: "Imię i nazwisko", value: data.name },
              { label: "PESEL", value: data.pesel },
              { label: "Data urodzenia", value: formatDate(data.dateOfBirth) },
              { label: "Miejsce urodzenia", value: data.placeOfBirth },
              { label: "Typ dokumentu", value: <DocumentTypeBadge type={data.documentType} /> },
              { label: "Numer dokumentu", value: data.documentNumber },
              { label: "Tytuł ubezpieczenia", value: data.insuranceTitle },
            ]}
          />
        </CardContent>
      </Card>
      <Card className="overflow-hidden border-0 shadow-md">
        <SectionHeader icon={MapPin} title="Adres Poszkodowanego" badge="Address" />
        <CardContent className="p-0">
          <DataTable
            data={[
              { label: "Ulica", value: data.address.street },
              { label: "Miasto", value: data.address.city },
              { label: "Kod pocztowy", value: data.address.postalCode },
              { label: "Kraj", value: data.address.country },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default CaseDetailsSectionTwo
