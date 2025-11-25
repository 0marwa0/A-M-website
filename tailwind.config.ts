import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1025",
        aurora: "#6d4aff",
        neon: "#8a2be2",
        plasma: "#ff1b9c",
        cyanflare: "#38d6ff"
      },
      boxShadow: {
        glow: "0 20px 70px rgba(136, 72, 255, 0.35)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)"
      },
      borderRadius: {
        xlcard: "32px",
        xxlcard: "40px"
      },
      backdropBlur: {
        soft: "10px"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 25px rgba(111, 66, 255, 0.35)" },
          "50%": { boxShadow: "0 0 45px rgba(255, 45, 115, 0.55)" }
        },
        "fade-slide": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3.8s ease-in-out infinite",
        "fade-slide": "fade-slide 0.8s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
