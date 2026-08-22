"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import ScrollIndicator from "./ScrollIndicator";

const HERO_SLIDES = [
  { id: 1, src: "/hero-bg.jpg", alt: "A nature-inspired luxury villa with an infinity pool set against misty mountains" },
  { id: 2, src: "/images/forest1.jpg", alt: "Lush green forest surrounding the luxury property" },
  { id: 3, src: "/images/forest2.jpg", alt: "Mist covered mountains and pristine nature" },
  { id: 4, src: "/images/forest3.jpg", alt: "Aerial view of the natural landscape" },
  { id: 5, src: "/images/forest4.jpg", alt: "Serene environment showcasing natural beauty" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-slide-index"));
            if (index) {
              setCurrentSlide(index);
            }
          }
        });
      },
      {
        rootMargin: "-49% 0px -49% 0px",
        threshold: 0,
      }
    );

    trackRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      aria-label="Hero Overview"
      className="relative w-full h-[500svh] bg-ink"
    >
      {/* 
        SINGLE STICKY HERO VIEWPORT (100svh)
        Contains all layers (Navbar, Images, Overlay, Persistent UI, Indicator).
        Stays locked at top:0 during the entire 500svh sequence, then
        releases cleanly as ONE unified visual unit when entering the next section.
      */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink z-10">
        
        {/* Layer 0: Persistent Navbar (Always visible across all slides) */}
        <Navbar />

        {/* Layer 1: Background Images (Continuous vertical filmstrip track with zero gap) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div
            className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{ transform: `translateY(-${(currentSlide - 1) * 100}%)` }}
          >
            {HERO_SLIDES.map((slide, index) => (
              <div key={slide.id} className="relative w-full h-full shrink-0 overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="100vw"
                  className="object-cover object-center"
                />
                {/* Consistent dark overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Layer 2: Persistent UI (Headline, Subtext, CTA) & Indicator */}
        <div className="relative z-20 h-full w-full pointer-events-none flex flex-col justify-center pt-20 pb-36 sm:pb-40 lg:py-0">
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,5vw,5rem)] pointer-events-auto">
            <div className="max-w-xl">
              <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-[#FFFFFF] text-balance">
                <span className="block font-light">Building</span>
                <span className="block font-medium italic text-[#C6A87C]">
                  Nature-Inspired
                </span>
                <span className="block font-light whitespace-nowrap">Luxury Destinations</span>
              </h1>

              <p className="mt-6 sm:mt-8 max-w-[50ch] text-[13px] tracking-wide leading-relaxed text-[#E0E0E0] text-pretty">
                Advaitam creates exceptional spaces that
                harmonize luxury, nature and timeless living.
              </p>

              <div className="mt-8 sm:mt-10">
                <Link
                  href="#projects"
                  className="group inline-flex min-h-[44px] min-w-[44px] items-center gap-4 py-3 px-4 -ml-4 text-[12px] font-semibold tracking-[0.16em] text-[#C6A87C]"
                >
                  <span className="border-b border-[#C6A87C]/50 pb-1 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-[#C6A87C]">
                    EXPLORE OUR PROJECTS
                  </span>
                  <svg
                    width="40"
                    height="12"
                    viewBox="0 0 40 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#C6A87C] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform transform-gpu backface-hidden group-hover:translate-x-2"
                  >
                    <path d="M0 6H38M38 6L33 1M38 6L33 11" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Persistent Indicator */}
          <ScrollIndicator current={currentSlide} total={HERO_SLIDES.length} />
        </div>
      </div>

      {/* 
        SCROLL SEQUENCE TRACK MARKERS
        5 x 100svh segments in document flow that drive the active slide index.
      */}
      <div className="absolute inset-0 pointer-events-none flex flex-col">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => {
              trackRefs.current[index] = el;
            }}
            data-slide-index={slide.id}
            className="h-[100svh] w-full"
          />
        ))}
      </div>
    </section>
  );
}