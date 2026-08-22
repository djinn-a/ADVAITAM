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
    <section id="philosophy" className="relative overflow-hidden bg-cream px-[clamp(1.5rem,5vw,2.5rem)] py-[clamp(3rem,8vw,6rem)]">
      {/* Background Watermark - Responsive sizing */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Leaf strokeWidth={0.5} className="text-brass w-[clamp(300px,50vw,600px)] h-[clamp(300px,50vw,600px)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* OUR PHILOSOPHY - Large responsive heading */}
        <h2 className="font-display text-brass uppercase tracking-widest text-[clamp(1.5rem,3vw,2.25rem)] mb-[clamp(1rem,2vw,1.5rem)]">
          OUR PHILOSOPHY
        </h2>

        {/* Main Heading - Responsive sizing */}
        <h3 className="font-display leading-[1.1] text-charcoal text-[clamp(2.25rem,5vw,3.75rem)]">
          Beyond Real Estate. We Create Legacies.
        </h3>

        {/* Pillars Wrapper - Responsive gap and margin */}
        <div className="mx-auto mt-[clamp(4rem,8vw,6rem)] flex max-w-5xl flex-col gap-[clamp(3rem,6vw,0px)] sm:flex-row sm:divide-x sm:divide-charcoal/10 sm:gap-0">
          {pillars.map((p) => (
            <div key={p.title} className="group flex flex-1 flex-col items-center px-4 sm:px-6 text-center">
              {/* Icon - Responsive sizing via width/height classes */}
              <span className="mb-[clamp(1.5rem,3vw,2rem)] flex text-brass transition-transform duration-300 group-hover:scale-110">
                <p.icon strokeWidth={1.5} className="w-[clamp(1.5rem,3vw,2.5rem)] h-[clamp(1.5rem,3vw,2.5rem)]" />
              </span>
              {/* Pillar Title - Responsive sizing */}
              <h4 className="font-display tracking-wide text-charcoal text-[clamp(1.125rem,2vw,1.5rem)]">
                {p.title}
              </h4>
              {/* Pillar Copy - Responsive sizing */}
              <p className="mx-auto mt-[clamp(0.75rem,2vw,1rem)] max-w-[250px] leading-relaxed text-stone text-[clamp(0.75rem,1.5vw,1rem)]">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}