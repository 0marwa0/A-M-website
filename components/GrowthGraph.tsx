'use client';

import { useState, useEffect } from 'react';

interface GrowthGraphProps {
  title: string;
  value: string;
  increase: string;
  delay?: number;
}

export default function GrowthGraph({
  title,
  value,
  increase,
  delay = 0
}: GrowthGraphProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 25);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const dataPoints = [
    { x: 0, y: 55 },
    { x: 12, y: 52 },
    { x: 24, y: 58 },
    { x: 36, y: 48 },
    { x: 48, y: 45 },
    { x: 60, y: 38 },
    { x: 72, y: 32 },
    { x: 84, y: 22 },
    { x: 100, y: 12 },
  ];

  const createPathData = () => {
    let path = `M ${dataPoints[0].x} ${dataPoints[0].y}`;
    for (let i = 1; i < dataPoints.length; i++) {
      const xc = (dataPoints[i].x + dataPoints[i - 1].x) / 2;
      const yc = (dataPoints[i].y + dataPoints[i - 1].y) / 2;
      path += ` Q ${dataPoints[i - 1].x} ${dataPoints[i - 1].y} ${xc} ${yc}`;
    }
    path += ` T ${dataPoints[dataPoints.length - 1].x} ${dataPoints[dataPoints.length - 1].y}`;
    return path;
  };

  const highlightPoint = dataPoints[dataPoints.length - 1];

  return (
    <div
      className="relative backdrop-blur-md rounded-lg p-4 border border-white/5"
      style={{
        background: 'rgba(8, 12, 16, 0.9)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="mb-3">
        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{title}</div>
        <div className="text-lg font-bold text-white">{value}</div>
        <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20">
          {increase}
        </div>
      </div>

      <div className="relative w-full h-16">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 60"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id={`glow-${title}`}>
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <path
            d={createPathData()}
            fill="none"
            stroke="#00ff88"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#glow-${title})`}
            opacity="0.9"
            style={{
              strokeDasharray: 200,
              strokeDashoffset: 200 - (progress * 2),
              transition: 'stroke-dashoffset 0.8s ease-out',
            }}
          />

          {progress > 90 && (
            <>
              <circle
                cx={highlightPoint.x}
                cy={highlightPoint.y}
                r="3"
                fill="#00ff88"
                opacity="0.2"
                className="animate-ping"
                style={{ animationDuration: '3s' }}
              />
              <circle
                cx={highlightPoint.x}
                cy={highlightPoint.y}
                r="1.5"
                fill="#00ff88"
                filter={`url(#glow-${title})`}
              />
            </>
          )}

          {dataPoints.map((point, index) => (
            progress > (index * 11) && (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="0.6"
                fill="#00ff88"
                opacity="0.4"
              />
            )
          ))}
        </svg>
      </div>
    </div>
  );
}
