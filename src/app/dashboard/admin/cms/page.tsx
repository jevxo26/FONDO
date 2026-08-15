// /dashboard/admin/cms/page.tsx
"use client";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { StatCard } from "@/components/dashboard/common/stat-card";
import { Button } from "@/components/ui/button";
import {
  Image,
  SlidersHorizontal,
  FileText,
  Layout,
  Plus,
  Newspaper,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

const MOCK_STATS = {
  totalBanners: 12,
  totalSliders: 8,
  totalBlogs: 45,
  totalPages: 6,
};

export default function CMSDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Content Management"
        description="Manage your website content, banners, blogs, and pages."
        icon={Layout}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Banners"
          value={MOCK_STATS.totalBanners.toString()}
          icon={Image}
          accent="right"
        />
        <StatCard
          label="Total Sliders"
          value={MOCK_STATS.totalSliders.toString()}
          icon={SlidersHorizontal}
          accent="right"
        />
        <StatCard
          label="Total Blogs"
          value={MOCK_STATS.totalBlogs.toString()}
          icon={Newspaper}
          accent="right"
        />
        <StatCard
          label="Total Pages"
          value={MOCK_STATS.totalPages.toString()}
          icon={FileText}
          accent="right"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <QuickActionCard
          icon={Image}
          label="Create Banner"
          onClick={() => router.push("/dashboard/admin/cms/banners/add")}
          color="bg-primary/10 text-primary"
        />
        <QuickActionCard
          icon={Newspaper}
          label="Create Blog"
          onClick={() => router.push("/dashboard/admin/cms/blogs/add")}
          color="bg-blue-500/10 text-blue-500"
        />
        <QuickActionCard
          icon={FileText}
          label="Create Page"
          onClick={() => router.push("/dashboard/admin/cms/pages/add")}
          color="bg-green-500/10 text-green-500"
        />
        <QuickActionCard
          icon={Settings}
          label="Open Settings"
          onClick={() => router.push("/dashboard/admin/cms/settings")}
          color="bg-purple-500/10 text-purple-500"
        />
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  color: string;
}

function QuickActionCard({ icon: Icon, label, onClick, color }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20"
    >
      <div className={`rounded-full p-3 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
}
