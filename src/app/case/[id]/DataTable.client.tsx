import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const DataTable = ({ 
  data 
}: { 
  data: { label: string; value: string | React.ReactNode }[] 
}) => (
  <Table>
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index} className="hover:bg-gray-50">
          <TableCell className="font-medium text-gray-600 w-1/3 py-3 text-sm">
            {row.label}
          </TableCell>
          <TableCell className="font-semibold text-gray-900 py-3 text-sm">
            {row.value}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default DataTable