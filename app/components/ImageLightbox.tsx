"use client";

import { useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

const ZOOM_STEPS = [1, 1.5, 2, 2.5, 3];

export default function ImageLightbox({
  src,
  alt,
  onClose,
}: Props) {
  const [step, setStep] = useState(0);

  const zoom = ZOOM_STEPS[step];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const zoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    setStep((s) =>
      Math.min(s + 1, ZOOM_STEPS.length - 1)
    );
  };

  const zoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    setStep((s) => Math.max(s - 1, 0));
  };

  // Click image to cycle zoom
  const handleImageClick = () => {
    if (step === ZOOM_STEPS.length - 1) {
      setStep(0);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-xl transition-all hover:scale-105 hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Image Wrapper */}
      <div
        className="relative flex h-full w-full items-center justify-center p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          onClick={handleImageClick}
          className="select-none rounded-2xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: zoom === 1 ? "96vw" : "none",
            maxHeight: zoom === 1 ? "88vh" : "none",
            objectFit: "contain",
            transform: `scale(${zoom})`,
            transformOrigin: "center",
            cursor:
              step < ZOOM_STEPS.length - 1
                ? "zoom-in"
                : "zoom-out",
          }}
        />

        {/* Zoom Controls */}
        <div
          className="absolute bottom-5 right-5 z-30 flex items-center gap-3 rounded-full bg-black/65 px-4 py-2 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={zoomOut}
            disabled={step === 0}
            className="text-xl font-bold leading-none text-white transition-colors hover:text-neutral-300 disabled:opacity-30"
          >
            −
          </button>

          <span className="w-10 text-center text-sm font-medium text-white">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={step === ZOOM_STEPS.length - 1}
            className="text-xl font-bold leading-none text-white transition-colors hover:text-neutral-300 disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}