"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Play } from "lucide-react";
import { VideoHeroProps } from "./types";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
  loading: () => null,
});

export function VideoHero({
  src,
  poster,
  label = "DESTINATION",
  title = "Jim Corbett.",
  subtitle = "Nature's Finest.",
  description = "A land of breathtaking beauty, thriving wildlife, and rising opportunities.",
  ctaText = "EXPLORE DESTINATION",
  ctaHref,
  className = "",
  onEnded,
}: Readonly<VideoHeroProps>) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    onEnded?.();
  }, [onEnded]);

  return (
    <section
      className={`relative w-full h-[50vh] min-h-[450px] overflow-hidden bg-ink ${className}`}
    >
      {/* ========== POSTER STATE ========== */}
      {!isPlaying && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={poster}
              alt="Video thumbnail"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
          </div>

          {/* Left content */}
          <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
            <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-brass uppercase">
              {label}
            </p>

            <h1 className="max-w-xl text-4xl leading-tight font-display text-ivory sm:text-5xl lg:text-6xl">
              {title}
              <br />
              <span className="italic text-brass-soft">{subtitle}</span>
            </h1>

            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-ivory/80 sm:text-sm">
              {description}
            </p>

            {ctaText && (
              <div className="mt-8">
                {ctaHref ? (
                  <a
                    href={ctaHref}
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] text-brass uppercase transition hover:text-brass-soft border-b border-brass/30 pb-1 hover:border-brass/50"
                  >
                    {ctaText}
                    <span aria-hidden>→</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] text-brass uppercase transition hover:text-brass-soft border-b border-brass/30 pb-1 hover:border-brass/50"
                  >
                    {ctaText}
                    <span aria-hidden>→</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Play button (center) */}
          <button
            type="button"
            onClick={handlePlay}
            className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 group"
            aria-label="Play video"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/40 transition group-hover:border-ivory/80 sm:h-[72px] sm:w-[72px] bg-ink/10 backdrop-blur-sm">
              <Play className="ml-1 h-6 w-6 fill-ivory text-ivory sm:h-7 sm:w-7" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-brass uppercase">
              PLAY VIDEO
            </span>
          </button>
        </>
      )}

      {/* ========== VIDEO STATE ========== */}
      {isPlaying && (
        <div className="absolute inset-0 z-30">
          <VideoPlayer
            src={src}
            poster={poster}
            autoPlay
            muted={false}          // sound starts only after user click
            onEnded={handleEnded}
          />
        </div>
      )}
    </section>
  );
}
