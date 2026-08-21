import { Leaf, LineChart, MapPin, Gem } from "lucide-react";
import { RiH4 } from "react-icons/ri";

const pillars = [
  {
    icon: Leaf,
    title: "Nature First",
    copy: "We design with nature, not against it.",
  },
  {
    icon: LineChart,
    title: "Timeless Design",
    copy: "Thoughtful architecture that stands the test of time.",
  },
  {
    icon: MapPin,
    title: "Prime Destinations",
    copy: "Carefully chosen locations with unmatched potential.",
  },
  {
    icon: Gem,
    title: "Enduring Value",
    copy: "Spaces that deliver lifestyle enrichment and long-term value.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-cream px-6 py-12 sm:px-10 sm:py-16 lg:py-20 xl:py-24">
      {/* Background Watermark - Responsive sizing */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Leaf strokeWidth={0.5} className="text-brass w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* OUR PHILOSOPHY - Large responsive heading */}
        <p className="font-display text-brass uppercase tracking-widest text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
          OUR PHILOSOPHY
        </p>

        {/* Main Heading - Responsive sizing */}
        <h2 className="font-display leading-tight text-charcoal text-4xl sm:text-5xl lg:text-6xl">
          Beyond Real Estate. We Create Legacies.
        </h2>

        {/* Pillars Wrapper - Responsive gap and margin */}
        <div className="mx-auto mt-16 lg:mt-24 flex max-w-5xl flex-col gap-12 sm:flex-row sm:divide-x sm:divide-charcoal/10 sm:gap-0">
          {pillars.map((p) => (
            <div key={p.title} className="group flex flex-1 flex-col items-center px-4 sm:px-6 text-center">
              {/* Icon - Responsive sizing via width/height classes */}
              <span className="mb-6 lg:mb-8 flex text-brass transition-transform duration-300 group-hover:scale-110">
                <p.icon strokeWidth={1.5} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              </span>
              {/* Pillar Title - Responsive sizing */}
              <h6 className="font-display tracking-wide text-charcoal text-lg sm:text-xl lg:text-2xl">
                {p.title}
              </h6>
              {/* Pillar Copy - Responsive sizing */}
              <p className="mx-auto mt-3 lg:mt-4 max-w-[200px] lg:max-w-[250px] leading-relaxed text-stone text-xs sm:text-sm lg:text-base">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}