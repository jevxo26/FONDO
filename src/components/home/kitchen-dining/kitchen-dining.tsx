import Image from 'next/image';

export function KitchenDining() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2">
          <span className="text-[11.5px] font-semibold uppercase tracking-[2.534px] text-foreground/60">
            Behind the pass
          </span>
          <h2 className="text-center font-fraunces text-[48px] leading-tight tracking-[-0.96px] text-foreground">
            Kitchen &amp; dining experience
          </h2>
          <p className="text-center text-base text-foreground/60">
            A look at the people, copper pots and quiet rooms behind every plate.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {/* Left: Kitchen brigade (tall) */}
          <div className="relative row-span-2 h-[456px] overflow-hidden rounded-[20px]">
            <Image
              src="/images/home/kitchen_brigade.png"
              alt="Kitchen brigade"
              fill
              sizes="292px"
              className="object-cover"
            />
          </div>

          {/* Center: Cooking + Dining table (stacked) */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[220px] overflow-hidden rounded-[20px]">
              <Image
                src="/images/home/cooking.png"
                alt="Cooking"
                fill
                sizes="327px"
                className="object-cover"
              />
            </div>
            <div className="relative h-[220px] overflow-hidden rounded-[20px]">
              <Image
                src="/images/home/dining_table.png"
                alt="Dining table"
                fill
                sizes="327px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Restaurant interior (tall) */}
          <div className="relative row-span-2 h-[456px] overflow-hidden rounded-[20px]">
            <Image
              src="/images/home/restaurant_interior.png"
              alt="Restaurant interior"
              fill
              sizes="327px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
