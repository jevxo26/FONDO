import { Receipt } from "lucide-react";
// import { OrderTabs } from "@/components/dashboard/orders/order-tabs";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { PendingOrdersTable } from "@/components/dashboard/orders/pending-orders-table";

export default function PendingOrdersPage() {
  const pendingOrders = [
    {
      id: "ORD-9001",
      customer: "Karim Uddin",
      items: "1x Salad, 1x Soup",
      total: "৳ 320",
      status: "Pending",
      date: "Jul 12, 2026",
    },
    {
      id: "ORD-9002",
      customer: "Saima Akter",
      items: "2x Pasta, 1x Coke",
      total: "৳ 550",
      status: "Pending",
      date: "Jul 12, 2026",
    },
    {
      id: "ORD-9003",
      customer: "Rahim Ahmed",
      items: "1x Burger, 1x Fries",
      total: "৳ 420",
      status: "Pending",
      date: "Jul 11, 2026",
    },
    {
      id: "ORD-9004",
      customer: "Fatima Khan",
      items: "3x Pizza, 2x Garlic Bread",
      total: "৳ 1250",
      status: "Pending",
      date: "Jul 11, 2026",
    },
    {
      id: "ORD-9005",
      customer: "Jannat Akter",
      items: "2x Pasta",
      total: "৳ 480",
      status: "Pending",
      date: "Jul 10, 2026",
    },
    {
      id: "ORD-9006",
      customer: "Tanvir Hasan",
      items: "1x Steak, 1x Mashed Potato",
      total: "৳ 890",
      status: "Pending",
      date: "Jul 10, 2026",
    },
    {
      id: "ORD-9007",
      customer: "Mehedi Hasan",
      items: "1x Ramen",
      total: "৳ 350",
      status: "Pending",
      date: "Jul 09, 2026",
    },
    {
      id: "ORD-9008",
      customer: "Nusrat Jahan",
      items: "2x Sushi Roll",
      total: "৳ 600",
      status: "Pending",
      date: "Jul 09, 2026",
    },
    {
      id: "ORD-9009",
      customer: "Arif Molla",
      items: "1x Fried Rice, 1x Chili Chicken",
      total: "৳ 520",
      status: "Pending",
      date: "Jul 08, 2026",
    },
    {
      id: "ORD-9010",
      customer: "Sumi Khatun",
      items: "1x Biryani",
      total: "৳ 250",
      status: "Pending",
      date: "Jul 08, 2026",
    },
  ];
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* <OrderTabs /> */}

      <PageHeader
        title="Pending Orders"
        description="Orders awaiting confirmation and processing."
        icon={Receipt}
      />

      <PendingOrdersTable orders={pendingOrders} />
    </div>
  );
}
