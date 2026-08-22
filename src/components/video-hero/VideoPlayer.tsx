"use client";

import { useEffect, useRef, useState } from "react";
import { createPlayer, features } from "@videojs/react";
import { Video } from "@videojs/react/video";
// We intentionally don't import default CSS because we are using Tailwind

const { Player } = createPlayer({
  features: [features.playback],
});

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  onEnded?: () => void;
}

export default function VideoPlayer({
  src,
  poster,
  autoPlay = true,
  muted = false,
  onEnded,
}: Readonly<VideoPlayerProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  return (
    <Player>
      <div ref={containerRef} className="relative h-full w-full bg-ink">
        {isInView && (
          <Video
            src={src}
            poster={poster}
            playsInline
            autoPlay={autoPlay}
            muted={muted}
            className="h-full w-full object-cover"
            onEnded={onEnded}
          />
        )}
      </div>
    </Player>
  );
}