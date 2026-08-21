"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Use IntersectionObserver instead of getBoundingClientRect in scroll event
    // This runs off the main thread and is extremely efficient on low-end devices
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: track, threshold: 0.5 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // Throttled scroll listener using requestAnimationFrame for arrow visibility
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (track) {
            setCanScrollLeft(track.scrollLeft > 0);
            setCanScrollRight(Math.ceil(track.scrollLeft + track.clientWidth) < track.scrollWidth);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToIndex = useCallback((idx: number) => {
    const card = cardRefs.current[idx];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      const card = cardRefs.current[0];
      if (!track || !card) return;

      const scrollAmount = card.offsetWidth + 20; // 20px gap
      track.scrollBy({ left: scrollAmount * dir, behavior: "smooth" });
    },
    []
  );

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
      <Image
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop"
        alt="Misty mountains with a winding river"
        fill
        sizes="100vw"
        priority
        unoptimized
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-ink/90" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <p className="eyebrow text-brass-soft uppercase tracking-[0.15em] text-[11px] font-semibold">OUR PROJECTS</p>
          <h2 className="mt-2 font-display text-4xl leading-tight text-ivory sm:text-5xl">
            Distinct Experiences.
            <br />
            One Philosophy.
          </h2>
        </div>

        <div className="relative mt-16">
          {/* arrows */}
          <button
            aria-label="Previous project"
            onClick={() => go(-1)}
            disabled={!canScrollLeft}
            className="absolute -left-14 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink/70 p-3 text-ivory backdrop-blur transition-all duration-300 hover:border-brass hover:text-brass disabled:opacity-30 lg:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next project"
            onClick={() => go(1)}
            disabled={!canScrollRight}
            className="absolute -right-14 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink/70 p-3 text-ivory backdrop-blur transition-all duration-300 hover:border-brass hover:text-brass disabled:opacity-30 lg:flex"
          >
            <ChevronRight size={18} />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
            style={{ willChange: "scroll-position" }}
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative aspect-[4/5] w-[78%] flex-none snap-start overflow-hidden rounded-sm sm:w-[46%] lg:w-[28%]"
              >
                <Image
                  src={p.image}
                  alt={`${p.name} - ${p.tagline}`}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 32vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="font-display text-2xl tracking-wide text-ivory">{p.name}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ivory/80">
                    {p.tagline}
                    <br />
                    {p.description}
                  </p>
                  <a
                    href="#contact"
                    className="group/link mt-6 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.14em] text-ivory"
                  >
                    EXPLORE PROJECT
                    <svg
                      width="32"
                      height="10"
                      viewBox="0 0 32 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-ivory transition-transform duration-300 group-hover/link:translate-x-1.5 transform-gpu"
                    >
                      <path d="M0 5H30M30 5L26 1M30 5L26 9" stroke="currentColor" strokeWidth="1" />
                    </svg>
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
                  className={`block h-1.5 rounded-full transition-all duration-300 transform-gpu ${i === active ? "w-6 bg-brass" : "w-1.5 bg-ivory/30"
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
