
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            
            {trend && trendValue && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium rounded-full px-2 py-0.5",
                    trend === 'up' && "bg-green-100 text-green-800",
                    trend === 'down' && "bg-red-100 text-red-800",
                    trend === 'neutral' && "bg-gray-100 text-gray-800"
                  )}
                >
                  {trend === 'up' && '↑ '}
                  {trend === 'down' && '↓ '}
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          
          {icon && <div className="text-healing-600">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
