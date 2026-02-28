"use client";

import React, { useState } from "react";

const SPLINE_VIEWER_URL =
  "https://my.spline.design/r4xbot-lgYNdEmt4BLtmHHZkoD0ykzU/";

const SplineScene: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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

      {/* Spline 3D scene via iframe */}
      <iframe
        src={SPLINE_VIEWER_URL}
        className={`spline-iframe ${isLoaded ? "spline-iframe-visible" : ""}`}
        onLoad={() => setIsLoaded(true)}
        allow="autoplay"
        title="3D Robot Scene"
      />

      {/* Bottom gradient mask to blend into site background */}
      <div className="spline-bottom-mask" />

      {/* Cover the Spline watermark */}
      <div className="spline-watermark-cover" />

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

        .spline-iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.8s ease-out;
        }
        .spline-iframe-visible {
          opacity: 1;
        }

        /* Bottom gradient fade to blend Spline ground into dark bg */
        .spline-bottom-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, #050816);
          pointer-events: none;
          z-index: 3;
          border-radius: 0 0 16px 16px;
        }

        /* Cover watermark in bottom-right */
        .spline-watermark-cover {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 200px;
          height: 60px;
          background: #050816;
          pointer-events: none;
          z-index: 4;
          border-radius: 8px 0 16px 0;
        }

        /* Loading overlay */
        .spline-loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          background: rgba(5, 8, 22, 0.6);
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
