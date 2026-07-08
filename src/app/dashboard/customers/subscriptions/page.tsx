import { SubscriptionContent } from '@/components/dashboard/customers/subscriptions/subscription-content';

export default function SubscriptionsPage() {
  return (
    <div>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
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
