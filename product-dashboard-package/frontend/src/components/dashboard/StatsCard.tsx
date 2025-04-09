import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: JSX.Element;
  percentageChange: number;
  className?: string;
}

const StatsCard = ({ title, value, icon, percentageChange, className }: StatsCardProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold">{value}</h3>
        <p className={cn(
          "text-sm font-medium",
          percentageChange > 0 ? "text-green-600" : "text-red-600"
        )}>
          {percentageChange > 0 ? "+" : ""}{percentageChange}%
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
