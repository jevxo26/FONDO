import { RequirePermission } from "@/components/common/require-permission";

export default function FoodsLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="foods">{children}</RequirePermission>;
}
