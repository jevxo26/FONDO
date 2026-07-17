import Categories from "@/components/foods/components/categories";
import FoodGrid from "@/components/foods/components/food-grid";
import Pagination from "@/components/foods/components/pagination";
import { getFoods } from "@/services/food.service";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function FoodsPage({ searchParams }: Props) {
  const { page = "1" } = await searchParams;

  const data = await getFoods(Number(page), 6);
  const foods = data.items;
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
              Slow-cooked Mughlai classics, prepared in single batches.{" "}
              <br className="hidden sm:inline" />
              Anything you order before 10 pm is delivered hot tonight.
            </p>
          </div>
        </div>
      </section>

      <Categories />
      <FoodGrid foods={foods} />
      <Pagination currentPage={Number(page)} totalPages={data.totalPages} />
    </main>
  );
}
