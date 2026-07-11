"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SearchForm() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Inline search bar — 2xl+ only */}
      <div className="hidden 2xl:flex">
        <form className="flex h-10 w-[296px] items-center rounded-2xl border border-border bg-muted">
          <Input
            type="text"
            placeholder="Search for products..."
            size="sm"
            className="h-full w-[195px] rounded-l-2xl border-0 bg-transparent px-4 text-base shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            variant="default"
            className="h-10 w-[100px] gap-1.5 rounded-r-2xl rounded-l-none px-4 text-sm font-medium text-white"
          >
            <Search className="size-4" />
            Search
          </Button>
        </form>
      </div>

      {/* Search icon — below 2xl */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-9 items-center justify-center rounded-full bg-muted border border-border 2xl:hidden"
        aria-label="Toggle search"
      >
        {isOpen ? <X className="size-4 text-foreground" /> : <Search className="size-4 text-foreground" />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-3 2xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <form className="flex h-10 w-full items-center rounded-2xl border border-border bg-muted">
            <Input
              type="text"
              placeholder="Search for products..."
              size="sm"
              className="h-full flex-1 rounded-l-2xl border-0 bg-transparent px-4 text-base shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              variant="default"
              className="h-10 w-[80px] gap-1 rounded-r-2xl rounded-l-none px-3 text-sm font-medium text-white"
            >
              <Search className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
