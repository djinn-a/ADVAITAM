import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-ink"
    >
      <Image
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop"
        alt="A nature-inspired luxury villa with an infinity pool set against misty mountains"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="max-w-xl pl-0 sm:pl-8">

          <h1 className="font-display text-[2.9rem] leading-[1.05] text-ivory sm:text-6xl md:text-7xl">
            <span className="block font-light">Building</span>
            <span className="block font-medium italic text-brass-soft">
              Nature-Inspired
            </span>
            <span className="block font-light">Luxury Destinations</span>
          </h1>

          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ivory/75">
            Advaitam creates exceptional spaces that harmonize luxury, nature
            and timeless living.
          </p>

          <div className="mt-9">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] text-ivory"
            >
              <span className="border-b border-brass pb-1">
                EXPLORE OUR PROJECTS
              </span>
              <ArrowRight size={16} className="text-brass" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 z-10 hidden flex-col items-center gap-3 sm:left-10 sm:flex">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-ivory/70">01</span>
        <span className="relative h-16 w-px bg-ivory/30">
          <span className="absolute left-0 top-0 h-1/3 w-px bg-ivory" />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-ivory/40">05</span>
        <span className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-ivory/60">
          SCROLL
        </span>
      </div>
    </section>
  );
}
