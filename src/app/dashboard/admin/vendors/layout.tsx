import { RequirePermission } from "@/components/common/require-permission";

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="vendors">{children}</RequirePermission>;
}
