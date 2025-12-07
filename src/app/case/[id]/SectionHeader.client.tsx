import { Badge } from "@/components/ui/badge";
const PRIMARY_COLOR = "#007834";

const SectionHeader = ({ 
  icon: Icon, 
  title, 
  badge 
}: { 
  icon: React.ElementType; 
  title: string;
  badge?: string;
}) => (
  <div 
    className="flex items-center justify-between py-3 px-4 rounded-t-lg"
    style={{ backgroundColor: `${PRIMARY_COLOR}10` }}
  >
    <div className="flex items-center gap-3">
      <div 
        className="p-2 rounded-lg"
        style={{ backgroundColor: `${PRIMARY_COLOR}20` }}
      >
        <Icon className="h-5 w-5" style={{ color: PRIMARY_COLOR }} />
      </div>
      <h3 className="text-base font-bold tracking-tight" style={{ color: PRIMARY_COLOR }}>
        {title}
      </h3>
    </div>
    {badge && (
      <Badge 
        variant="outline" 
        className="text-xs font-medium"
        style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
      >
        {badge}
      </Badge>
    )}
  </div>
);

export default SectionHeader 