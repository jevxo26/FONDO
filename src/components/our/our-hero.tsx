"use client";

export default function StoryHero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-foreground">
      
      {/* 1. Background Image using a high-quality free Unsplash URL */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1800&auto=format&fit=crop')` 
        }}
        role="img"
        aria-label="Traditional heritage spices and slow cooking environment"
      />
      
      {/* 2. Dark Overlay using primary-foreground hex equivalent (#1B0E08) for deep visual contrast */}
      <div className="absolute inset-0 bg-[#1B0E08]/75 backdrop-blur-[1px]" />

      {/* 3. Main Content Container using your custom global .wrapper utility */}
      <div className="wrapper relative z-10 flex flex-col items-center justify-center text-center space-y-6 pt-24 pb-20">
        
        {/* Decorative Badge with primary gold color and low opacity background */}
        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.25em] bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full">
          EST. 1924 • Traditional Hearth
        </span>

        {/* Main Headline utilizing font-heading (Serif) and global text-background (#FAF5EB) for high contrast */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.15] text-background max-w-5xl tracking-tight">
          A Legacy of Flavor, <br />
          <span className="italic text-primary">Crafted for Today</span>
        </h1>

        {/* Sub-headline utilizing font-sans and lighter background contrast */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-background/80 max-w-2xl leading-relaxed tracking-wide font-light">
          From the heart of ancient slow-fire kitchens to your modern table. We preserve the authentic culinary heritage of generations past with modern nutritional balance.
        </p>

        {/* Call to Actions utilizing global primary and secondary variables */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          {/* Primary Action Button using bg-primary (#CEA359) and dark text-primary-foreground */}
          <button className="w-full sm:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-sans font-bold text-xs rounded-xl shadow-lg hover:opacity-90 transition-all uppercase tracking-widest">
            Explore Our Story
          </button>
          
          {/* Secondary Action Button using transparent base and global border-border variable */}
          <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-background border border-border/30 hover:bg-background/10 font-sans font-bold text-xs rounded-xl transition-all uppercase tracking-widest">
            View Heritage Menu
          </button>
        </div>

        {/* Decorative Saffron Gold Vertical Line */}
        <div className="h-16 w-[1.5px] bg-primary/60 mt-10 rounded-full animate-bounce" aria-hidden="true" />

      </div>
    </section>
  );
}