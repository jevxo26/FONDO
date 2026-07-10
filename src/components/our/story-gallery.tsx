import Image from "next/image";

export default function StoryGallery() {
  return (
    <section className="bg-background py-16">
      <div className="wrapper">
        
        {/* CENTERED SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto mb-12 flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-widest text-primary font-bold">
            Behind the Pass
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
            Kitchen & dining experience
          </h2>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-1">
            A look at the people, copper pots and quiet moments behind every plate.
          </p>
        </div>

        {/* ASYMMETRIC MOSAIC GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Tall Portrait Action Capture (3 Cols wide on desktop) */}
          <div className="lg:col-span-3 relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-sm border border-border/10 bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Chefs prepping artisanal ingredients over a hot range pass"
              fill
              sizes="(max-w-1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>

          {/* Center Column: Stacked Landscape Images (4 Cols wide on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-sm border border-border/10 bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1588416820614-f8d6ac6cea56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudCUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D"
                alt="Steaming copper pot with freshly cooked luxury Kacchi"
                fill
                sizes="(max-w-1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-sm border border-border/10 bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1529940316268-e245e031bcd1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cozy ambient dining room booths setup and light fixtures"
                fill
                sizes="(max-w-1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Right-Center Column: Warm Table Environment (3 Cols wide on desktop) */}
          <div className="lg:col-span-3 relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-sm border border-border/10 bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1572715376701-98568319fd0b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fine dining table environment layout underneath hanging warm chandelier light"
              fill
              sizes="(max-w-1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>

          {/* Far Right Column: Hero Food Presentation Card (2 Cols wide on desktop) */}
          <div className="lg:col-span-2 relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm border border-border/10 bg-muted self-start">
            <Image
              src="https://images.unsplash.com/photo-1529940316268-e245e031bcd1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Signature slow fire Biryani platter ready for table service"
              fill
              sizes="(max-w-1024px) 50vw, 16vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}