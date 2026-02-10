"use client";
import { useRef, useState, useEffect } from "react";
import { LuPlay, LuPause, LuVolume2, LuVolumeX, LuMaximize, LuMinimize } from "react-icons/lu";

export default function VibeSection() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setPlaying(true);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(total || 0);
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTo;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !playing && videoRef.current) {
            videoRef.current.play().catch(() => {});
            setPlaying(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (playerContainerRef.current) {
      observer.observe(playerContainerRef.current);
    }

    const handlePlayRequest = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
        setPlaying(true);
      }
    };
    window.addEventListener("play-showreel", handlePlayRequest);

    return () => {
      observer.disconnect();
      window.removeEventListener("play-showreel", handlePlayRequest);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [playing]);

  return (
    <section
      id="vibe-section"
      aria-label="LegendLuxury vibe teaser"
      className="relative isolate overflow-hidden"
    >
      <div className="soft-gradient" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
        <h2 className="text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]" style={{ fontFamily: "var(--font-serif)" }}>
          <span className="block text-[28px] md:text-[36px] font-medium">Can you decode the</span>
          <span className="block text-[28px] md:text-[36px] font-medium">Legend Luxury vibe?</span>
        </h2>

        <div className="mt-10 flex justify-center">
          <div 
            ref={playerContainerRef}
            className="group relative w-full max-w-3xl overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-black/10 md:rotate-[2deg]"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => playing && setShowControls(false)}
          >
            {/* Main Video Layer */}
            <div className="relative aspect-[16/9]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="https://res.cloudinary.com/dcs3xfpz0/video/upload/v1769848323/labgypmzqo4rfg07el4r.mp4"
                playsInline
                muted={muted}
                onClick={handlePlayPause}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                Sorry, your browser doesn’t support embedded videos.
              </video>

              {/* Center Play Button Overlay */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
                  <button
                    onClick={handlePlayPause}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-accent-600 shadow-xl transition-transform hover:scale-110 hover:bg-white active:scale-95"
                    aria-label="Play video"
                  >
                    <LuPlay className="ml-1 h-8 w-8 fill-current" />
                  </button>
                </div>
              )}

              {/* Bottom Controls Bar */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 ${
                  showControls || !playing ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-col gap-2">
                  {/* Progress Bar */}
                  <div className="group/slider relative h-1 w-full cursor-pointer">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleSeek}
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      aria-label="Seek video"
                    />
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/30">
                      <div 
                        className="h-full bg-accent-500 transition-all duration-100"
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                    <div 
                      className="absolute top-1/2 -mt-1.5 h-3 w-3 -translate-x-1.5 rounded-full bg-white opacity-0 transition-opacity group-hover/slider:opacity-100"
                      style={{ left: `${progress}%` }}
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={handlePlayPause}
                        className="rounded-full p-1 hover:bg-white/20 transition-colors"
                        aria-label={playing ? "Pause" : "Play"}
                      >
                        {playing ? <LuPause className="h-6 w-6" /> : <LuPlay className="h-6 w-6 fill-current" />}
                      </button>
                      
                      <div className="group/vol flex items-center gap-2">
                        <button 
                          onClick={handleMuteToggle}
                          className="rounded-full p-1 hover:bg-white/20 transition-colors"
                          aria-label={muted ? "Unmute" : "Mute"}
                        >
                          {muted ? <LuVolumeX className="h-6 w-6" /> : <LuVolume2 className="h-6 w-6" />}
                        </button>
                      </div>

                      <span className="text-sm font-medium tabular-nums">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <button 
                      onClick={handleFullscreen}
                      className="rounded-full p-1 hover:bg-white/20 transition-colors"
                      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                      {isFullscreen ? <LuMinimize className="h-6 w-6" /> : <LuMaximize className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rainbow-band" aria-hidden="true" />
    </section>
  );
}
