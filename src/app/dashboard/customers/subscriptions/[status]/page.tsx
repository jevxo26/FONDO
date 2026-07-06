import { SubscriptionContent } from "@/components/dashboard/subscriptions/subscription-content";

export default async function SubscriptionsStatusPage({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;
  return <SubscriptionContent statusFilter={status} />;
}
