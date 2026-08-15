import { RequirePermission } from "@/components/common/require-permission";

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="reports">{children}</RequirePermission>;
}
