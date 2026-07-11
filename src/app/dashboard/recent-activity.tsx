'use client';

import { Clock, Package, CreditCard, UserPlus, AlertCircle } from 'lucide-react';

const activities = [
  { id: 1, type: 'order', text: 'New order #2048 from Zaman Heritage', time: '2 min ago', icon: Package },
  { id: 2, type: 'payment', text: 'Payment of ৳12,400 settled to Kacchi Bhai', time: '15 min ago', icon: CreditCard },
  { id: 3, type: 'user', text: 'New vendor registration: Spice Garden', time: '32 min ago', icon: UserPlus },
  { id: 4, type: 'alert', text: 'Order #2045 delivery delayed by 15 min', time: '1 hr ago', icon: AlertCircle },
  { id: 5, type: 'order', text: 'Order #2047 marked as completed', time: '1 hr ago', icon: Package },
  { id: 6, type: 'payment', text: 'Refund of ৳520 processed for order #2039', time: '2 hr ago', icon: CreditCard },
  { id: 7, type: 'user', text: 'Rider Karim joined the fleet', time: '3 hr ago', icon: UserPlus },
];

const iconConfig: Record<string, { bg: string; color: string }> = {
  order: { bg: 'bg-primary/10', color: 'text-primary' },
  payment: { bg: 'bg-success/10', color: 'text-success' },
  user: { bg: 'bg-primary/10', color: 'text-primary' },
  alert: { bg: 'bg-destructive/10', color: 'text-destructive' },
};

export function RecentActivity() {
  return (
    <div className="group relative rounded-3xl bg-border/15 p-[1px] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--shadow-elevated)]">
      <div className="rounded-[calc(1.375rem-1px)] bg-gradient-to-br from-card via-card to-card/98 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-1 group-hover:ring-primary/10">
        <h3 className="font-fraunces text-lg font-semibold text-foreground">Recent Activity</h3>
        <div className="mt-5 flex flex-col gap-4">
          {activities.map((activity) => {
            const cfg = iconConfig[activity.type] || { bg: 'bg-muted', color: 'text-muted-foreground' };
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${cfg.bg} ring-1 ring-primary/5`}>
                  <activity.icon className={`size-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <div className="mt-0.5 flex items-center gap-1">
                    <Clock className="size-3 text-primary/50" />
                    <span className="text-[11px] text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
