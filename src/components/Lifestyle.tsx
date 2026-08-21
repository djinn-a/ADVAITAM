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
    <section id="lifestyle" className="bg-cream px-6 py-20 sm:px-10 sm:py-28 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Title and Intro */}
          <div className="col-span-1 lg:col-span-4 flex flex-col">
            <div className="sticky top-40">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-8">
                The Advaitam<br />Difference
              </h2>
              <p className="text-stone text-sm sm:text-base leading-relaxed max-w-sm">
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
                className={`flex gap-6 sm:gap-12 py-10 sm:py-12 ${index === 0 ? 'border-t-0 pt-0 lg:pt-0' : 'border-t border-charcoal/20'}`}
              >
                {/* Number */}
                <div className="flex-shrink-0 pt-1.5">
                  <span className="text-stone/60 text-xs sm:text-sm font-semibold tracking-widest">
                    {item.id}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-4">
                    {item.title}
                  </h3>
                  <p className="text-stone text-sm sm:text-base leading-relaxed max-w-xl">
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
