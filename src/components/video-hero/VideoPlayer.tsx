"use client";

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
  return (
    <Player>
      <div className="relative h-full w-full bg-ink">
        <Video
          src={src}
          poster={poster}
          playsInline
          autoPlay={autoPlay}
          muted={muted}
          className="h-full w-full object-cover"
          onEnded={onEnded}
        />
      </div>
    </Player>
  );
}