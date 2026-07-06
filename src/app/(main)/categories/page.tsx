import CategoriesMenu from "@/components/categories/menu/Menu";

export default function CategoriesPage() {

  return (
    <main className="min-h-screen bg-background">
      {/* Menu Header Section */}
      <section className="py-12 lg:py-16">
        <div className="wrapper">
          <div className="flex flex-col gap-2.5 max-w-xl">
            <span className="font-sans text-sm font-normal text-muted-foreground tracking-wide">
              Tonight&apos;s menu
            </span>
            <h1 className="font-fraunces text-4xl font-normal tracking-tight text-secondary-foreground sm:text-5xl lg:text-[56px] leading-tight">
              The Menu.
            </h1>
            <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground mt-2">
              Slow-cooked Mughlai classics, prepared in single batches. <br className="hidden sm:inline" />
              Anything you order before 10 pm is delivered hot tonight.
            </p>
          </div>
        </div>
      </section>
      <CategoriesMenu></CategoriesMenu>
    </main>
  );
}