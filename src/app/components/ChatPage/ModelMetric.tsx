interface ModelMetricProps {
  label: string;
  value: string | number;
  unit?: string;
}

export function ModelMetric({ label, value, unit = "" }: ModelMetricProps) {
  return (
    <div className="my-1 px-1" style={{ width: "250px" }}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-normal">{`${value} ${unit}`}</span>
      </div>
    </div>
  );
}
