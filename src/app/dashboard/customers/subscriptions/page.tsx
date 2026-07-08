import { Repeat } from 'lucide-react';
import { SubscriptionContent } from '@/components/dashboard/customers/subscriptions/subscription-content';

export default function SubscriptionsPage() {
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Repeat className="size-8 text-primary" />
        </div>
        <div>
          <h2 className="font-fraunces text-4xl font-bold text-foreground">
            Subscription Management
          </h2>
          <p className="mt-2 text-muted-foreground">
            Manage and monitor all customer meal subscriptions.
          </p>
        </div>
      </div>
      <SubscriptionContent />
    </div>
  );
}
