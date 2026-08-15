import { RequirePermission } from "@/components/common/require-permission";

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="orders">{children}</RequirePermission>;
}
