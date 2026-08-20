import { Leaf, LineChart, MapPin, Gem } from "lucide-react";

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
    <section id="philosophy" className="bg-cream px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow text-brass">Our Philosophy</p>

        <h2 className="mt-4 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
          Beyond real estate.
          <br />
          We create <span className="italic text-brass">legacies</span>.
        </h2>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-4 sm:gap-x-8">
          {pillars.map((p) => (
            <div key={p.title} className="group flex flex-col items-center">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/15 text-brass transition-colors duration-300 group-hover:border-brass group-hover:bg-brass/10">
                <p.icon size={20} strokeWidth={1.5} />
              </span>
              <h3 className="text-[13px] font-semibold tracking-[0.04em] text-charcoal">
                {p.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-stone">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
