import Categories from "@/components/foods/components/categories";
import FoodGrid from "@/components/foods/components/food-grid";
import Pagination from "@/components/foods/components/pagination";

async function getFoods() {
  const res = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error("Failed to fetch foods");
  const data = await res.json();
  return data.products;
}

export default async function CategoriesPage() {
  const foods = await getFoods();
  return (
    <main className="min-h-screen bg-background pb-16">
      <section className="py-12 lg:py-16">
        <div className="wrapper">
          <div className="flex flex-col gap-2.5 max-w-xl">
            <span className="font-sans text-sm font-normal text-primary tracking-wide">
              Tonight&apos;s menu
            </span>
            <h1 className="font-fraunces text-4xl font-normal tracking-tight text-secondary-foreground sm:text-5xl lg:text-[56px] leading-tight">
              The Menu.
            </h1>
            <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground mt-1">
              Slow-cooked Mughlai classics, prepared in single batches. <br className="hidden sm:inline" />
              Anything you order before 10 pm is delivered hot tonight.
            </p>
          </div>
        </div>
      </section>

      <Categories />
      <FoodGrid foods={foods} />
      <Pagination />
    </main>
  );
}