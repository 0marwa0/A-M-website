"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import Spline with SSR disabled for performance
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="spline-loader">
      <div className="spline-loader-ring" />
    </div>
  ),
});

const SplineScene: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="spline-scene-wrapper">
      {/* Loading skeleton while Spline loads */}
      {!isLoaded && (
        <div className="spline-loading-overlay">
          <div className="spline-loader">
            <div className="spline-loader-ring" />
          </div>
        </div>
      )}

      {/* Spline 3D scene */}
      <div
        className={`spline-canvas ${isLoaded ? "spline-canvas-visible" : ""}`}
      >
        <Spline
          scene="https://prod.spline.design/kaxk39NUR04e45pU/scene.splinecode"
          onLoad={handleLoad}
        />
      </div>

      {/* Bottom gradient mask to blend into site background */}
      <div className="spline-bottom-mask" />

      <style jsx>{`
        .spline-scene-wrapper {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 500px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 16px;
        }

        /* Bottom gradient fade to blend Spline ground into dark bg */
        .spline-bottom-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, #0a0f2a);
          pointer-events: none;
          z-index: 3;
          border-radius: 0 0 16px 16px;
        }

        /* Loading overlay */
        .spline-loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          background: rgba(10, 15, 42, 0.4);
          backdrop-filter: blur(4px);
          border-radius: 16px;
        }

        /* Loader ring */
        .spline-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .spline-loader-ring {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid rgba(88, 97, 242, 0.15);
          border-top-color: #5861f2;
          animation: loaderSpin 0.9s linear infinite;
        }
        @keyframes loaderSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Spline canvas container */
        .spline-canvas {
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-out;
        }
        .spline-canvas-visible {
          opacity: 1;
        }

        /* Ensure the Spline canvas fills its container properly */
        .spline-canvas :global(canvas) {
          width: 100% !important;
          height: 100% !important;
          outline: none;
          border-radius: 16px;
        }

        /* Hide the Spline watermark for cleaner look */
        .spline-canvas :global(a[href*="spline"]) {
          display: none !important;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .spline-scene-wrapper {
            height: 420px;
          }
        }
        @media (max-width: 768px) {
          .spline-scene-wrapper {
            height: 320px;
            border-radius: 12px;
          }
          .spline-bottom-mask {
            height: 80px;
            border-radius: 0 0 12px 12px;
          }
        }
        @media (max-width: 480px) {
          .spline-scene-wrapper {
            height: 260px;
          }
        }
      `}</style>
    </div>
  );
};

export default SplineScene;
