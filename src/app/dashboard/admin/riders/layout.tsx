import { RequirePermission } from "@/components/common/require-permission";

export default function RidersLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="riders">{children}</RequirePermission>;
}
