"use client";

import Image from "next/image";
import Link from "next/link";

// Mock data replicating the categories in the design
const categoriesData = [
  {
    id: 1,
    name: "Heritage Mutton Kacchi",
    // Using a placeholder that resembles a transparent PNG food bowl
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Kacchi",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Tehari",
    image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Roast",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Kebab",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Borhani",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Dessert",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=300&auto=format&fit=crop",
  },
];

export default function PopularCategories() {
  return (
    <section className="py-16">
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="mb-10 flex flex-col gap-2">
          {/* 
            The header in the design has a distinctive low-contrast dark slate tone 
            against the black background. 
          */}
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-[#171A21] tracking-tight">
            Popular categories
          </h2>
          <p className="font-sans text-sm text-slate-400">
            Open right now and delivering to your area.
          </p>
        </div>

        {/* HORIZONTAL SCROLLING CAROUSEL */}
        <div className="relative w-full">
          <div className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {categoriesData.map((category) => (
              <Link
                key={category.id}
                href={`/menu?category=${category.name.toLowerCase().replace(/ /g, "-")}`}
                className="group flex flex-col items-center justify-between bg-white rounded-[24px] p-5 min-w-[150px] max-w-[150px] sm:min-w-[170px] sm:max-w-[170px] aspect-[4/5] shrink-0 snap-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* 
                  Using a circular image container to simulate the transparent 
                  PNG bowl cutouts shown in the design. 
                */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mt-2 mb-4 bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                
                <h3 className="font-sans text-[13px] sm:text-sm font-bold text-[#16100C] text-center leading-snug max-w-[120px]">
                  {category.name}
                </h3>
              </Link>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}