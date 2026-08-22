const differences = [
  {
    id: "01",
    title: "Nature First",
    description: "Minimal footprint construction techniques that preserve existing root systems and natural water flows."
  },
  {
    id: "02",
    title: "Enduring Design",
    description: "Timeless architectural forms utilizing vernacular materials that weather beautifully over generations."
  },
  {
    id: "03",
    title: "Curated Location",
    description: "Strictly selected parcels that guarantee privacy, spectacular vistas, and immediate access to wilderness."
  },
  {
    id: "04",
    title: "Uncompromising Quality",
    description: "Artisanal craftsmanship paired with cutting-edge environmental engineering for effortless living."
  },
  {
    id: "05",
    title: "Long-term Value",
    description: "Scarcity and enduring quality ensuring your sanctuary is both a retreat and a sound legacy asset."
  }
];

export default function Lifestyle() {
  return (
    <section id="lifestyle" className="bg-cream px-[clamp(1.5rem,5vw,2.5rem)] py-[clamp(5rem,10vw,10rem)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(4rem,8vw,2rem)]">
          
          {/* Left Column: Title and Intro */}
          <div className="col-span-1 lg:col-span-4 flex flex-col">
            <div className="sticky top-[clamp(5rem,10vh,10rem)] will-change-transform">
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] text-charcoal leading-[1.1] mb-[clamp(1.5rem,3vw,2rem)]">
                The Advaitam<br />Difference
              </h2>
              <p className="text-stone text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed max-w-sm">
                Our approach is uncompromising. Every decision is weighed against its impact on the land and the quality of life it provides.
              </p>
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right Column: Difference List */}
          <div className="col-span-1 lg:col-span-7 flex flex-col">
            {differences.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex gap-[clamp(1.5rem,4vw,3rem)] py-[clamp(2.5rem,5vw,3rem)] ${index === 0 ? 'border-t-0 pt-0 lg:pt-0' : 'border-t border-charcoal/20'}`}
              >
                {/* Number */}
                <div className="flex-shrink-0 pt-1.5">
                  <span className="text-stone/60 text-[clamp(0.75rem,1vw,0.875rem)] font-semibold tracking-widest">
                    {item.id}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="font-display text-[clamp(1.5rem,3vw,1.875rem)] text-charcoal mb-[clamp(0.75rem,2vw,1rem)]">
                    {item.title}
                  </h3>
                  <p className="text-stone text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
