import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InstrumentCardProps {
  name: string;
  icon: React.ReactNode;
  value: number;
  max: number;
  onClick: () => void;
}

export function InstrumentCard({
  name,
  icon,
  value,
  max,
  onClick,
}: InstrumentCardProps) {
  const selected = value > 0;

  const label =
    max === 1
      ? value === 1
        ? "필요"
        : "필요 없음"
      : value === 0
        ? "필요 없음"
        : `${value}명 필요`;

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "cursor-pointer select-none transition-all hover:bg-accent",
        selected && "border-primary bg-primary/5"
      )}
    >
      <CardHeader className="items-center pb-2">
        <div className="text-3xl">{icon}</div>
        <CardTitle className="text-base">{name}</CardTitle>
      </CardHeader>

      <CardContent className="text-center">
        <p
          className={cn(
            "font-medium",
            selected ? "text-primary" : "text-muted-foreground"
          )}
        >
          {label}
        </p>
      </CardContent>
    </Card>
  );
}