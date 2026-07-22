"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAdminCustomers } from "@/hooks/use-admin-customers";
import type { AdminCustomer } from "@/types/admin";

interface CustomerSearchProps {
  onSelect: (customer: AdminCustomer) => void;
  selectedCustomer: AdminCustomer | null;
  placeholder?: string;
}

export function CustomerSearch({
  onSelect,
  selectedCustomer,
  placeholder = "Search customer by name, email or phone...",
}: CustomerSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data } = useAdminCustomers({
    search: query || undefined,
    limit: 10,
  });

  const results = data?.items ?? [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {selectedCustomer ? (
        <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-2.5">
          <Avatar>
            <AvatarFallback className="bg-primary/20 text-xs font-bold text-primary">
              {selectedCustomer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">{selectedCustomer.fullName}</p>
            <p className="text-xs text-muted-foreground">{selectedCustomer.email} · {selectedCustomer.phone}</p>
          </div>
          <button
            onClick={() => {
              handleClear();
              onSelect(null as unknown as AdminCustomer);
            }}
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="h-11 rounded-2xl bg-muted pl-10 pr-10 text-sm"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      )}

      {isOpen && !selectedCustomer && query && (
        <div className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-primary/10 bg-card p-2 shadow-[var(--shadow-elevated)]">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">No customers found</p>
          ) : (
            results.map((customer) => (
              <button
                key={customer.id}
                onClick={() => {
                  onSelect(customer);
                  setIsOpen(false);
                  setQuery("");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted"
              >
                <Avatar>
                  <AvatarFallback className="bg-muted text-xs font-bold text-muted-foreground">
                    {customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-foreground">{customer.fullName}</p>
                  <p className="text-xs text-muted-foreground">{customer.email}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  customer.status === "ACTIVE"
                    ? "bg-success/10 text-success"
                    : customer.status === "SUSPENDED"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted text-muted-foreground"
                }`}>
                  {customer.status}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
