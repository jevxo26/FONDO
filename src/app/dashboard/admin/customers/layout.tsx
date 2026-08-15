import { RequirePermission } from "@/components/common/require-permission";

export default function CustomersLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="users">{children}</RequirePermission>;
}
