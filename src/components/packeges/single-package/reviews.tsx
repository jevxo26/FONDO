import React from "react";
import { Star } from "lucide-react";

export default function ChroniclesReviews() {
  const reviews = [
    { name: "A. Rahman", rating: 5, date: "2 days ago", comment: "The caloric precision coupled with authentic regional flavor balance is remarkable. Lost 3kg sustainably over my 30-day framework." },
    { name: "S. Khan", rating: 4, date: "1 week ago", comment: "Exceptional fish dishes. The delivery updates are highly accurate, and the eco-cell retrieval framework works flawlessly." }
  ];

  return (
    <section className="bg-white border border-[#d7c3b2]/20 rounded-[2rem] p-6 lg:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="font-serif text-xl text-[#1e1b17]">Verified Chronicles</h2>
        <p className="text-[11px] text-[#524437]/70">Authentic testaments from our active collective community</p>
      </div>

      {/* Aggregate rating visualization bar chart */}
      <div className="bg-[#fff8f3] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="text-center sm:text-left">
          <div className="text-3xl font-serif font-bold text-[#1e1b17]">4.9</div>
          <div className="flex text-[#d9933d] justify-center sm:justify-start my-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-current" />)}
          </div>
          <span className="text-[10px] text-[#524437]/60">Based on 120+ active subscriptions</span>
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          {[
            { stars: 5, pct: "92%" },
            { stars: 4, pct: "6%" },
            { stars: 3, pct: "2%" }
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-[10px] text-[#524437]">
              <span className="w-3 text-right">{row.stars}</span>
              <div className="flex-1 h-1.5 bg-[#d7c3b2]/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#885200]" style={{ width: row.pct }} />
              </div>
              <span className="w-6 text-right text-[#524437]/60">{row.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards mapping logic */}
      <div className="space-y-4">
        {reviews.map((rev, idx) => (
          <div key={idx} className="border-b border-[#d7c3b2]/20 pb-4 last:border-none last:pb-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-[#885200]/10 flex items-center justify-center text-[10px] font-bold text-[#885200]">
                  {rev.name[0]}
                </div>
                <span className="text-xs font-bold text-[#1e1b17]">{rev.name}</span>
              </div>
              <span className="text-[10px] text-[#524437]/50">{rev.date}</span>
            </div>
            <p className="text-xs text-[#524437]/90 leading-relaxed font-sans pl-8">{rev.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}