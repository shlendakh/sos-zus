"use client"
import CaseDetailsSectionOne from "./CaseDetailsSectionOne.client";
import CaseDetailsSectionTwo from "./CaseDetailsSectionTwo.client";
import CaseDetailsSectionThree from "./CaseDetailsSectionThree.client";
import { useQuery } from "@tanstack/react-query";
import { fetchCase } from "@/services/cases/case.actions";

type CaseDetailsProps = {
  id: string;
};

export function CaseDetails({ id }: CaseDetailsProps) {


const { data, isError, isLoading } = useQuery({
    queryKey: ["case", id],
    queryFn: () => fetchCase(id),
  })
  
  if(isError) return <div>error</div>

  if(isLoading) return <div>loading</div>

  if (!data) return <div>No data</div>;

  return (
    <main>
      <CaseDetailsSectionOne data={data.payerInfo}/>
      <CaseDetailsSectionTwo data={data.victimInfo}/>
      <CaseDetailsSectionThree data={data.accidentInfo}/>
    </main>
  );
}

export default CaseDetails