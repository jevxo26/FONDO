import { RequirePermission } from "@/components/common/require-permission";

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="settings">{children}</RequirePermission>;
}
