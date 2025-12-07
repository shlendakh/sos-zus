import { Card, CardContent } from "@/components/ui/card"
import { Eye, AlertTriangle } from "lucide-react"
import DataTable from "./DataTable.client"
import SectionHeader from "./SectionHeader.client"
import BooleanBadge from "./BooleanBadge.client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Prisma } from "../../../../prisma/prisma/client"

type AccidentWithWitnesses = Prisma.AccidentInfoGetPayload<{
  include: { witnesses: true }
}>
interface CaseDetailsSectionThreeProps {
  data: AccidentWithWitnesses
}
const PRIMARY_COLOR = "#007834"
const formatDateTime = (date: Date) => {
  return date.toLocaleString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const CaseDetailsSectionThree = ({ data }: CaseDetailsSectionThreeProps) => {
  return (
    <div>
      <Card className="overflow-hidden border-0 shadow-md lg:col-span-2">
        <SectionHeader icon={AlertTriangle} title="Informacje o Wypadku" badge="AccidentInfo" />
        <CardContent className="p-0">
          <DataTable
            data={[
              { label: "ID zdarzenia", value: data.id },
              { label: "Data i godzina wypadku", value: formatDateTime(data.date) },
              { label: "Zgłaszający", value: data.nameOfReporter },
              { label: "Wypadek przy pracy", value: <BooleanBadge value={data.isWorkAccident} /> },
              { label: "Wina poszkodowanego", value: <BooleanBadge value={data.isVictimFault} /> },
              { label: "Stan nietrzeźwości", value: <BooleanBadge value={data.isDrunk} /> },
            ]}
          />

          <div className="p-4">
            <p className="mb-2 text-sm font-medium text-gray-600">Opis zdarzenia:</p>
            <p className="rounded-lg border bg-gray-50 p-3 text-sm text-gray-800">{data.info}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-md">
        <SectionHeader
          icon={Eye}
          title="Lista Świadków"
          badge={`Witness (${data.witnesses.length})`}
        />
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: `${PRIMARY_COLOR}05` }}>
                <TableHead className="font-semibold text-gray-700">Imię i nazwisko</TableHead>
                <TableHead className="font-semibold text-gray-700">Kontakt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.witnesses.map((witness) => (
                <TableRow key={witness.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{witness.name}</TableCell>
                  <TableCell className="text-gray-600">{witness.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default CaseDetailsSectionThree
