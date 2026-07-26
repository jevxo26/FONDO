export function DeviceRegistry() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-normal text-foreground">Active Devices</h3>
        <p className="font-sans text-[11px] text-muted-foreground/70 mt-1">Review active sessions and revoke access if suspicious.</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-card">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">PC</span>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold text-foreground">Windows PC - Chrome</h4>
              <span className="text-[8px] bg-success/10 text-success font-bold tracking-wider uppercase px-1.5 py-0.5 rounded mt-0.5 inline-block">Current Session</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-card">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-[10px] font-bold text-muted-foreground">IP</span>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold text-foreground">iPhone 15 Pro - Safari</h4>
            </div>
          </div>
          <button className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/10 transition-colors">
            Revoke
          </button>
        </div>
      </div>
    </div>
  );
}
