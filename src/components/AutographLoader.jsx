import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AutographLoader
 * Plays the full handwritten autograph video animation on initial load
 * with seamless dark blending, live progress, and graceful exit transition.
 */
export default function AutographLoader({ onComplete }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const hasFinishedRef = useRef(false);

  // Lock body scroll while loading screen is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Show subtle skip button after 1s in case the user wishes to proceed quickly
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    // Safety timeout: ensure site becomes interactive even if playback is interrupted
    const safetyTimeout = setTimeout(() => {
      finishAnimation();
    }, 4500);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(skipTimer);
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        finishAnimation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Trigger autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay deferred:", err);
        });
      }
    }
  }, []);

  const finishAnimation = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsEnded(true);

    // Hold the completed autograph for 400ms so the user sees the finished signature
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 450);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      const pct = Math.min(100, Math.round((currentTime / duration) * 100));
      setProgress(pct);

      // Play this full: trigger completion once video reaches the end
      if (currentTime >= duration - 0.06) {
        finishAnimation();
      }
    }
  };

  const handleVideoEnded = () => {
    setProgress(100);
    finishAnimation();
  };

  return (
    <AnimatePresence>
      {!isEnded && (
        <motion.div
          key="autograph-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(10px)",
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden cursor-default"
          style={{ willChange: "opacity, transform, filter" }}
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_rgba(0,0,0,0)_70%)]" />

          {/* Autograph Animation Player */}
          <div className="relative w-[90vw] max-w-[480px] sm:max-w-[560px] aspect-[512/318] flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onError={() => {
                finishAnimation();
              }}
              className="w-full h-full object-contain pointer-events-none mix-blend-screen"
            >
              <source src="/autograph-nikhil-yadav.mp4" type="video/mp4" />
              <source src="/autograph-nikhil-yadav.webm" type="video/webm" />
              Your browser does not support HTML5 video.
            </video>
          </div>

          {/* Minimalist Progress Track & Details */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
            {/* 1px Fine Hairline Progress Track */}
            <div className="w-32 sm:w-44 h-[2px] bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neutral-600 via-neutral-300 to-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Subtle Brand Tagline */}
            {/* <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-neutral-500 font-mono uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
              <span>Nikhil Yadav</span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-400 font-mono tabular-nums">{progress}%</span>
            </div> */}
          </div>

          {/* Skip Button */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={finishAnimation}
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-[11px] font-mono tracking-wider text-neutral-500 hover:text-neutral-200 transition-colors px-3 py-1.5 rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-950/70 backdrop-blur-xs cursor-pointer flex items-center gap-1.5"
              aria-label="Skip intro animation"
            >
              <span>Skip</span>
              <span className="text-[10px] text-neutral-600 border border-neutral-800 rounded px-1">ESC</span>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
