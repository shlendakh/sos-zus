"use client"

import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
import { fetchAllCases } from "@/services/cases/list-cases.actions";
import { Spinner } from "@/components/ui/spinner";
import NotFound from "@/components/ui/notfound";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";

const AllCases = () =>{

    const { data, isError, isLoading } = useQuery({
      queryKey: ["cases", "all"],
      queryFn: () => fetchAllCases(),
    })

    if (isError) return <div>error</div>

    if(isLoading) return (<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <Spinner className="size-8 text-green-500" />
  </main>)

  if (!data) return <NotFound/>
  
    return(
    <div>
      <Card className="w-full p-8">
        <p className="mt-4 text-lg">
          Aplikacja do zarządzania i obsługi szkód w Zakładzie Ubezpieczeń Społecznych.
        </p>
      </Card>

      <Table>
        <TableCaption>lista spraw</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">numer case</TableHead>
            <TableHead>przejdź</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell className="font-medium"><Link href={`/case/${item.id}`}>link</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    )
}

export default AllCases