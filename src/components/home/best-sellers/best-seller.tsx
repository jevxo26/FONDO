import FoodCard from '@/components/common/cards/food-card';
import FoodGrid from '@/components/foods/components/food-grid';
import { FOOD_ITEMS } from '@/data/foodsdata';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HomeBestSeller = () => {
    const foods = FOOD_ITEMS.slice(0,4)
    return (
      <section className="py-12 bg-background">
            <div className="wrapper">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-black tracking-tight">
              Best Sellers
            </h2>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4 text-[#D9A05B]" />
              <span className="font-sans text-sm font-medium text-slate-400">
                Near Dhanmondi, Dhaka
              </span>
            </div>
          </div>

          <Link
            href="/foods" 
            className="inline-flex items-center gap-2 bg-[#F8F5F2] hover:bg-white text-[#16100C] px-5 py-2.5 rounded-full font-sans text-sm font-bold transition-colors w-fit"
          >
            View full menu
            <ArrowUpRight className="size-4 stroke-[2.5]" />
          </Link>
        </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {foods.map((food, index) => (
                  <FoodCard
                    key={index} 
                    food={food} 
                  />
                ))}
              </div>
            </div>
          </section>
    );
};

export default HomeBestSeller;