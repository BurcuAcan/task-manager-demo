import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Check, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: readonly string[];
  iconColor: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
  iconColor,
}: FeatureCardProps) {
  return (
    <Card className="text-left">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
