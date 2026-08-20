"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback((idx: number) => {
    const card = cardRefs.current[idx];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = Math.max(0, Math.min(projects.length - 1, active + dir));
      scrollToIndex(next);
    },
    [active, scrollToIndex]
  );

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
      <Image
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop"
        alt="Misty mountains with a winding river"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-ink/90" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <p className="eyebrow text-brass-soft">Our Projects</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl">
            Three Distinct Experiences.
            <br />
            One <span className="italic text-brass-soft">Philosophy</span>.
          </h2>
        </div>

        <div className="relative mt-16">
          {/* arrows */}
          <button
            aria-label="Previous project"
            onClick={() => go(-1)}
            disabled={active === 0}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink/70 p-3 text-ivory backdrop-blur transition-all duration-300 hover:border-brass hover:text-brass disabled:opacity-30 lg:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next project"
            onClick={() => go(1)}
            disabled={active === projects.length - 1}
            className="absolute right-0 top-1/2 z-10 hidden translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink/70 p-3 text-ivory backdrop-blur transition-all duration-300 hover:border-brass hover:text-brass disabled:opacity-30 lg:flex"
          >
            <ChevronRight size={18} />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative aspect-[4/5] w-[78%] flex-none snap-start overflow-hidden rounded-sm sm:w-[46%] lg:w-[31.5%]"
              >
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.tagline}`}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 32vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="eyebrow text-brass-soft">{p.tagline}</span>
                  <h3 className="mt-2 font-display text-2xl text-ivory">{p.name}</h3>
                  <p className="mt-1 text-[13px] text-ivory/70">{p.description}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-ivory opacity-0 transition-all duration-300 group-hover:opacity-100"
                  >
                    EXPLORE PROJECT
                    <ArrowRight size={14} className="text-brass" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* dot indicators */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                aria-label={`Go to ${p.name}`}
                onClick={() => scrollToIndex(i)}
                className="p-1.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-brass" : "w-1.5 bg-ivory/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
