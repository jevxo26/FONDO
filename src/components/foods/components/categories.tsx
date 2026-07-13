"use client";

import { TogglePill } from "@/components/common/toggle-pill";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Kacchi",
  "Tehari",
  "Roast",
  "Kebab",
  "Borhani",
  "Dessert",
  "Drinks",
] as const;

export default function Categories() {
  const [active, setActive] = useState("All");

  return (
    <section className="border-y border-border/60 bg-secondary/30 py-5">
      <div className="wrapper overflow-x-auto no-scrollbar">
        <TogglePill items={CATEGORIES} value={active} onChange={setActive} />
      </div>
    </section>
  );
}
