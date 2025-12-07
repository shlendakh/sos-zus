"use client"
import CaseDetailsSectionOne from "./CaseDetailsSectionOne.client";
import CaseDetailsSectionTwo from "./CaseDetailsSectionTwo.client";
import CaseDetailsSectionThree from "./CaseDetailsSectionThree.client";
import { useQuery } from "@tanstack/react-query";
import { fetchCase } from "@/services/cases/case.actions";
import { Spinner } from "@/components/ui/spinner";
import NotFound from "@/components/ui/notfound";

type CaseDetailsProps = {
  id: string
}

export function CaseDetails({ id }: CaseDetailsProps) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["case", id],
    queryFn: () => fetchCase(id),
  })

  if (isError) return <div>error</div>

  if(isLoading) return (<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <Spinner className="size-8 text-green-500" />
  </main>)

  if (!data) return <NotFound/>

  return (
    <main>
      <CaseDetailsSectionOne data={data.payerInfo} />
      <CaseDetailsSectionTwo data={data.victimInfo} />
      <CaseDetailsSectionThree data={data.accidentInfo} />
    </main>
  )
}

export default CaseDetails
