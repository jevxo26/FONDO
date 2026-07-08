import { MapPin } from "lucide-react";

export default function RidersLivePage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <MapPin className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Live Tracking
          </h2>
          <p className="mt-1 text-muted-foreground">
            View real-time rider locations and routes.
          </p>
        </div>
      </div>
    </div>
  );
}
