"use client";
import { useRef, useState, useEffect } from "react";

export default function VibeSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startPlayback = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };

  useEffect(() => {
    const handlePlayRequest = () => {
      startPlayback();
    };
    window.addEventListener("play-showreel", handlePlayRequest);
    return () => window.removeEventListener("play-showreel", handlePlayRequest);
  }, []);

  return (
    <section
      id="vibe-section"
      aria-label="LegendLuxury vibe teaser"
      className="relative isolate overflow-hidden"
    >
      <div
        className="soft-gradient"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
        <h2 className="text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]" style={{ fontFamily: "var(--font-serif)" }}>
          <span className="block text-[28px] md:text-[36px] font-medium">Can you decode the</span>
          <span className="block text-[28px] md:text-[36px] font-medium">Legend Luxury vibe?</span>
        </h2>

        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="relative aspect-[16/9] rounded-xl bg-white/95 shadow-2xl ring-1 ring-black/10 md:rotate-[2deg]">
              {!playing && <div className="checkerboard rounded-xl" />}
              {!playing && (
                <button
                  aria-label="Play showreel"
                  onClick={startPlayback}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-14 w-14 place-items-center rounded-full bg-white text-accent-600 shadow-md focus-visible:ring-2 focus-visible:ring-accent-600"
                >
                  <span aria-hidden="true">▶</span>
                </button>
              )}
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full rounded-xl object-cover"
                src="https://res.cloudinary.com/dcs3xfpz0/video/upload/v1769848323/labgypmzqo4rfg07el4r.mp4"
                controls
                playsInline
                muted
                preload="metadata"
                aria-label="LegendLuxury vibe showreel"
              >
                Sorry, your browser doesn’t support embedded videos.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="rainbow-band" aria-hidden="true" />
    </section>
  );
}
