export function LoginHistoryTable() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-normal text-foreground">Security Logs</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Recent system logins. Read-only audit.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-muted border-b border-border text-[9px] uppercase tracking-wider font-bold text-muted-foreground/70">
              <th className="p-3">Platform</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Location</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground/80">
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="p-3 font-medium">Chrome on Windows</td>
              <td className="p-3 font-mono text-[11px]">103.230.104.12</td>
              <td className="p-3">Dhaka, BD</td>
              <td className="p-3 text-muted-foreground">2026-07-18 14:32</td>
            </tr>
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="p-3 font-medium">Safari on iPhone</td>
              <td className="p-3 font-mono text-[11px]">103.230.105.45</td>
              <td className="p-3">Chittagong, BD</td>
              <td className="p-3 text-muted-foreground">2026-07-15 09:12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
