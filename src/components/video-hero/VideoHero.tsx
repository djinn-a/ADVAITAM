"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, X } from "lucide-react";
import { VideoHeroProps } from "./types";

export function VideoHero({
  src,
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
  const [isFloating, setIsFloating] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    onEnded?.();
  }, [onEnded]);

  const isFloatingRef = useRef(false);
  useEffect(() => {
    isFloatingRef.current = isFloating;
  }, [isFloating]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting && !video.paused) {
          setIsFloating(true);
        } else if (entry.isIntersecting) {
          setIsFloating(false);
          // Auto-play when it comes into view
          if (video.paused) {
            video.play().catch(() => {
              // Ignore autoplay restrictions if any
            });
            setIsPlaying(true);
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const closeFloating = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsFloating(false);
  }, []);


  return (
    <section
      ref={sectionRef}
      className={`group/section relative w-full h-[clamp(400px,45vh,600px)] overflow-hidden bg-ink ${className}`}
    >
      {/* ========== NATIVE VIDEO OR FLOATING MINI-PLAYER ========== */}
      <div
        className={isFloating
          ? "fixed bottom-6 right-6 z-50 w-56 sm:w-80 aspect-video shadow-2xl rounded-lg overflow-hidden transition-all duration-300 pointer-events-auto bg-ink border border-ivory/20"
          : "absolute inset-0 z-0"
        }
      >
        <video
          ref={videoRef}
          src={src}
          playsInline
          muted
          className="h-full w-full object-cover pointer-events-none scale-[1.35] md:scale-100"
          onEnded={handleEnded}
          translate="no"
          controlsList="nodownload"
        >
          <track kind="captions" />
        </video>

        {isFloating && (
          <div className="absolute top-2 right-2 flex items-center gap-2">

            <button
              type="button"
              onClick={closeFloating}
              className="p-1.5 bg-ink/80 hover:bg-ink rounded-full text-ivory/80 hover:text-ivory backdrop-blur-sm transition-colors border border-ivory/20"
              aria-label="Close video"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Dark overlay for readability - Always Visible */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent pointer-events-none" />

      {/* Left content - Always Visible */}
      <div className="absolute inset-0 z-20 mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 pointer-events-none">
        <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-brass uppercase pointer-events-auto w-max">
          {label}
        </p>

        <h1 className="max-w-xl text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.1] font-display text-ivory pointer-events-auto w-max">
          {title}
          <br />
          <span className="italic text-brass-soft">{subtitle}</span>
        </h1>

        {/* Play/Pause button - Inline on mobile, absolute on desktop */}
        {!isFloating && (
          <button
            type="button"
            onClick={togglePlay}
            className={`pointer-events-auto mt-[clamp(1rem,4vw,2rem)] self-start md:absolute md:top-1/2 md:left-[60%] z-30 flex md:-translate-x-1/2 md:-translate-y-1/2 flex-row md:flex-col items-center gap-4 group transition-opacity duration-500 ${isPlaying ? 'opacity-0 group-hover/section:opacity-100' : 'opacity-100'}`}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div className="flex h-[clamp(4rem,8vw,4.5rem)] w-[clamp(4rem,8vw,4.5rem)] items-center justify-center rounded-full border border-ivory/40 transition group-hover:border-ivory/80 bg-ink/10 backdrop-blur-sm">
              {isPlaying ? (
                <Pause className="h-[clamp(1.5rem,3vw,1.75rem)] w-[clamp(1.5rem,3vw,1.75rem)] fill-ivory text-ivory" />
              ) : (
                <Play className="ml-1 h-[clamp(1.5rem,3vw,1.75rem)] w-[clamp(1.5rem,3vw,1.75rem)] fill-ivory text-ivory" />
              )}
            </div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-brass uppercase">
              {isPlaying ? "PAUSE VIDEO" : "PLAY VIDEO"}
            </span>
          </button>
        )}

        <p className="mt-[clamp(0.5rem,2vw,1.25rem)] max-w-md text-[clamp(13px,1.5vw,14px)] leading-relaxed text-ivory/80 pointer-events-auto">
          {description}
        </p>

        {ctaText && (
          <div className="mt-[clamp(1.5rem,4vw,2rem)] pointer-events-auto w-max">
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



    </section>
  );
}