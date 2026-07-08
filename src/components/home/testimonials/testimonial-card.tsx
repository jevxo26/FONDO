import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/common/rating-stars";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    text: string;
    verified: boolean;
  };
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">
              {testimonial.name}
            </span>
            <RatingStars rating={testimonial.rating} size="sm" />
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {testimonial.verified && (
          <Badge variant="secondary" className="w-fit bg-success/10 text-success">
            Verified
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
