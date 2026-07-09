"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFinish = () => {
    setIsVisible(false);
    // Restore scroll controls
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    
    // Wait for the fadeout opacity animation (1000ms) to complete before unmounting
    setTimeout(() => {
      setIsMounted(false);
    }, 1000);
  };

  useEffect(() => {
    // Lock scroll on mount
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      // Attempt playing unmuted first (since user requested sound)
      video.play()
        .then(() => {
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Autoplay unmuted failed (browser policy). 
          // Fallback: play muted automatically so the visual starts, and show an unmute toggle
          setAutoplayBlocked(true);
          setIsMuted(true);
          video.muted = true;
          video.play().catch(e => console.log("Muted autoplay blocked too:", e));
        });
    }

    // Safety fallback timeout: automatically disappear after 7 seconds
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 7000);

    return () => {
      clearTimeout(safetyTimer);
      // Ensure scroll is restored on unmount
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      setAutoplayBlocked(false);
      // Restart the video from the beginning so they hear the full intro sound
      video.currentTime = 0;
      video.play().catch(e => console.log("Play failed after unmute:", e));
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Cinematic backing glow */}
      <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-r from-[#E44CFF]/15 to-[#4EF0FF]/15 blur-[100px] animate-pulse pointer-events-none" />

      {/* Video Container */}
      <div className="relative z-10 w-full max-w-[620px] px-6 flex flex-col items-center justify-center">
        <video
          ref={videoRef}
          src="/lodo_video/video-1783574031815.mp4"
          playsInline
          onEnded={handleFinish}
          // Using mix-blend-mode screen so that the black video box disappears 
          // and only the glowing logo graphics blend seamlessly with our background glow
          className="w-full h-auto object-contain rounded-lg mix-blend-screen pointer-events-none"
        />

        {/* Dynamic Autoplay Blocked Banner - Sleek Glassmorphic CTA */}
        {autoplayBlocked && (
          <button
            onClick={handleUnmute}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#4EF0FF]/30 bg-[#4EF0FF]/10 backdrop-blur-md text-xs font-semibold text-white hover:bg-[#4EF0FF]/25 hover:border-[#4EF0FF]/50 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(78,240,255,0.15)] animate-fade-in"
          >
            <Volume2 className="w-4 h-4 text-[#4EF0FF] animate-bounce" />
            <span>تشغيل الصوت / Unmute Sound</span>
          </button>
        )}
      </div>
    </div>
  );
}
