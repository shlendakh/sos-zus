import { Badge } from "@/components/ui/badge"

const PRIMARY_COLOR = "#007834"
const BooleanBadge = ({
  value,
  trueLabel = "TAK",
  falseLabel = "NIE",
}: {
  value: boolean | string
  trueLabel?: string
  falseLabel?: string
}) => {
  const isTrue = value === true || value === "TAK"
  return (
    <Badge
      variant="secondary"
      className="text-xs font-medium"
      style={{
        backgroundColor: isTrue ? "#dc262615" : `${PRIMARY_COLOR}15`,
        color: isTrue ? "#dc2626" : PRIMARY_COLOR,
      }}
    >
      {isTrue ? trueLabel : falseLabel}
    </Badge>
  )
}

export default BooleanBadge
