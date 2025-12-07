import { Badge } from "@/components/ui/badge"

const PRIMARY_COLOR = "#007834"

const DocumentTypeBadge = ({ type }: { type: "PERSONAL_ID" | "PASSPORT" }) => (
  <Badge
    variant="secondary"
    className="text-xs"
    style={{
      backgroundColor: type === "PERSONAL_ID" ? `${PRIMARY_COLOR}15` : "#3b82f615",
      color: type === "PERSONAL_ID" ? PRIMARY_COLOR : "#3b82f6",
    }}
  >
    {type === "PERSONAL_ID" ? "Dowód osobisty" : "Paszport"}
  </Badge>
)

export default DocumentTypeBadge
