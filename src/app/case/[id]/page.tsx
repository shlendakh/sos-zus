import CaseDetails from "./CaseDetails.client"

interface Params {
  params: {
    id: string
  }
}

export default async function Case({ params }: Params) {
  const id = params.id

  return <CaseDetails id={id} />
}
