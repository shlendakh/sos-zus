const DataRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-2 gap-4 py-3 border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors">
    <span className="text-sm text-muted-foreground font-medium pl-2">
      {label}
    </span>
    {/* Poprawiony wygląd wartości: pogrubienie i większy kontrast */}
    <span className="text-sm font-semibold text-foreground text-right pr-2">
      {value}
    </span>
  </div>
);

export default DataRow;