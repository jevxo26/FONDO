import React from "react";

export default function OurStory() {
  return (
    <section className="py-20 bg-[#FAF5EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left B&W Image with badge overlay */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden grayscale border border-black/10">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600" 
              alt="NYC street view chef cooking window" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlapping Badge */}
          <div className="absolute -bottom-6 -right-4 md:-right-6 size-24 md:size-28 rounded-full bg-[#FCD391] border border-[#CEA359]/30 flex flex-col items-center justify-center shadow-lg text-center p-3">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#16100C]/60">Since</span>
            <span className="font-fraunces text-xl font-bold text-[#16100C]">2021</span>
          </div>
        </div>
        {/* Right Text */}
        <div className="lg:col-span-7 space-y-6 lg:pl-8">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#CEA359]">Our Legacy</span>
          <h2 className="font-fraunces text-3xl md:text-5xl font-normal text-[#16100C]">
            The Story Behind Food Flow
          </h2>
          <div className="font-sans text-sm text-[#16100C]/75 space-y-4 leading-relaxed font-light">
            <p>
              At the heart of the bustling city, we noticed a recurring thermal pattern: hardworking professionals compromising their health metrics simply because daily cooking eating is an uphill battle when operating in modern ecosystems.
            </p>
            <p>
              We saw the gap between professional kitchens and healthy home nutrition. The problem wasn&apos;t lack of desire, but a lack of &ldquo;accessible nutrition&rdquo; that fits into execution schedules.
            </p>
            <p>
              Food Flow was born to bridge this gap, allowing the modern professional to deliver authentic and standard nutritional values to the body without losing single seconds of preparation time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}