"use client";

import { Check, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import FlowCanvas from "@/components/FlowCanvas";

export default function Home() {
  const { locale, setLocale, t } = useI18n();

  const communityMembers = [
    {
      name: "Syed Muhammad Haris",
      role: "CEO",
      orbit: 640,
      initialAngle: 0,
      duration: 60,
      badgeWidth: "14rem",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Malik Murtaza",
      role: "CTO",
      orbit: 640,
      initialAngle: 90,
      duration: 60,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Haseeb Arshad",
      role: "Sales Manager",
      orbit: 640,
      initialAngle: 180,
      duration: 60,
      badgeWidth: "14.5rem",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Saffuan Mushtaq",
      role: "Developer",
      orbit: 640,
      initialAngle: 270,
      duration: 60,
      badgeWidth: "13.5rem",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Sarah Chen",
      role: "Designer",
      orbit: 480,
      initialAngle: 45,
      duration: 50,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "James Wilson",
      role: "Product Lead",
      orbit: 480,
      initialAngle: 135,
      duration: 50,
      badgeWidth: "14rem",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Emily Parker",
      role: "Marketing",
      orbit: 480,
      initialAngle: 225,
      duration: 50,
      badgeWidth: "13.5rem",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Alex Kumar",
      role: "Engineer",
      orbit: 480,
      initialAngle: 315,
      duration: 50,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
  ];

  const floatingAvatars = [
    {
      orbit: 320,
      initialAngle: 0,
      duration: 40,
      size: "50px",
      image:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 320,
      initialAngle: 72,
      duration: 40,
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 320,
      initialAngle: 144,
      duration: 40,
      size: "48px",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 320,
      initialAngle: 216,
      duration: 40,
      size: "50px",
      image:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 320,
      initialAngle: 288,
      duration: 40,
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 760,
      initialAngle: 30,
      duration: 70,
      size: "46px",
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 760,
      initialAngle: 150,
      duration: 70,
      size: "48px",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 760,
      initialAngle: 270,
      duration: 70,
      size: "46px",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
  ];

  const orbitDots = [
    { left: "35%", top: "32%" },
    { left: "62%", top: "28%" },
    { left: "26%", top: "57%" },
    { left: "50%", top: "68%" },
    { left: "72%", top: "70%" },
    { left: "20%", top: "78%" },
    { left: "58%", top: "46%" },
  ];

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={{
        background: "radial-gradient(circle at 30% 30%, #1b1f3b, #0a0f2a 70%)",
      }}
    >
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-3xl font-bold tracking-tight flex items-center gap-1">
              <span className="bg-gradient-to-r from-[#4EF0FF] to-[#5861F2] bg-clip-text text-transparent">
                TRI
              </span>
              <span className="text-white">MINDS</span>
            </div>
          </div>
          <div
            style={{ fontSize: "23px" }}
            className="hidden lg:flex items-center gap-8"
          >
            <a
              href="#services"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.solutions")}
            </a>
            <a
              href="#contact"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.contact")}
            </a>
            <a
              href="#about"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.about")}
            </a>
            <a
              href="#packages"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.pricing")}
            </a>
          </div>
          <div className="flex items-center">
            <button
              className="px-4 py-2 rounded-xl border border-white/30 text-sm text-white/90 hover:border-[#E44CFF] hover:bg-[#E44CFF]/10 transition-all duration-300"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 overflow-visible pt-20"
      >
        <div className="max-w-7xl mx-auto relative w-full">
          {/* Centered Content */}
          <div className="flex flex-col items-center text-center space-y-6 mb-16 animate-fade-in">
            {/* Headline with toggle emphasis */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] max-w-4xl">
              <span className="inline-flex items-center gap-3 flex-wrap justify-center">
                <span className="text-white">{t("hero.heading")}</span>
                <span className="text-white/40">{t("hero.headingHighlight")}</span>
              </span>
            </h1>

            {/* Secondary heading */}
            <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl font-normal">
              {t("hero.heading1")}
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
              <a
                href="#contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-[#E44CFF] to-[#5861F2] rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(228,76,255,0.6)]"
              >
                <span className="relative z-10">{t("hero.cta1")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#5861F2] to-[#E44CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#services"
                className="px-10 py-5 border-2 border-white/30 rounded-full font-semibold text-lg hover:border-[#E44CFF] hover:bg-[#E44CFF]/10 transition-all duration-300 backdrop-blur-sm"
              >
                {t("hero.cta2")}
              </a>
            </div>
          </div>

          {/* Visual Diagram - FlowCanvas */}
          <div className="relative flex items-center justify-center animate-fade-in mt-12">
            <FlowCanvas t={t} locale={locale} />
          </div>
        </div>
      </section>

      {/* AI Integration Process Section */}
      <section
        id="about"
        className="relative z-10 py-20"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("about.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("about.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("about.subheading")}
            </p>
          </div>

          {/* Process Flow Diagram */}
          <div className="relative flex items-center justify-center">
            <svg
              width="2000"
              height="450"
              viewBox="0 0 2000 450"
              className="w-full h-auto"
            >
              <defs>
                <filter id="processGlow">
                  <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient
                  id="waveGradientFull"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#7B4CFF" />
                  <stop offset="16%" stopColor="#8B56FF" />
                  <stop offset="33%" stopColor="#5861F2" />
                  <stop offset="50%" stopColor="#5BA8F7" />
                  <stop offset="66%" stopColor="#4ECFFC" />
                  <stop offset="100%" stopColor="#4EF0FF" />
                </linearGradient>
              </defs>

              {/* Single Continuous Wave Line connecting all 6 steps */}
              <path
                d="M 80 225 Q 200 130, 330 200 T 630 160 Q 780 110, 930 180 T 1230 140 Q 1380 90, 1530 160 T 1920 225"
                stroke="url(#waveGradientFull)"
                strokeWidth="5"
                fill="none"
                opacity="0.8"
              />

              {/* Step 1 - Discovery */}
              <g transform="translate(220, 200)">
                <circle
                  cx="0"
                  cy="0"
                  r="65"
                  fill="#7B4CFF"
                  opacity="0.15"
                  filter="url(#processGlow)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="#7B4CFF"
                  opacity="0.2"
                  filter="url(#processGlow)"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="70"
                  fontWeight="900"
                  fill="#7B4CFF"
                  filter="url(#processGlow)"
                >
                  1
                </text>
              </g>
              <foreignObject x="70" y="300" width="300" height="100">
                <div style={{
                  direction: locale === 'ar' ? 'rtl' : 'ltr',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {t("about.steps.discovery.title")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.discovery.line1")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.discovery.line2")}
                  </div>
                </div>
              </foreignObject>

              {/* Step 2 - Planning */}
              <g transform="translate(540, 160)">
                <circle
                  cx="0"
                  cy="0"
                  r="65"
                  fill="#8B56FF"
                  opacity="0.15"
                  filter="url(#processGlow)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="#8B56FF"
                  opacity="0.2"
                  filter="url(#processGlow)"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="70"
                  fontWeight="900"
                  fill="#8B56FF"
                  filter="url(#processGlow)"
                >
                  2
                </text>
              </g>
              <foreignObject x="390" y="260" width="300" height="100">
                <div style={{
                  direction: locale === 'ar' ? 'rtl' : 'ltr',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {t("about.steps.planning.title")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.planning.line1")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.planning.line2")}
                  </div>
                </div>
              </foreignObject>

              {/* Step 3 - Development */}
              <g transform="translate(860, 180)">
                <circle
                  cx="0"
                  cy="0"
                  r="65"
                  fill="#5861F2"
                  opacity="0.15"
                  filter="url(#processGlow)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="#5861F2"
                  opacity="0.2"
                  filter="url(#processGlow)"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="70"
                  fontWeight="900"
                  fill="#5861F2"
                  filter="url(#processGlow)"
                >
                  3
                </text>
              </g>
              <foreignObject x="710" y="280" width="300" height="100">
                <div style={{
                  direction: locale === 'ar' ? 'rtl' : 'ltr',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {t("about.steps.development.title")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.development.line1")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.development.line2")}
                  </div>
                </div>
              </foreignObject>

              {/* Step 4 - Testing/QA */}
              <g transform="translate(1180, 140)">
                <circle
                  cx="0"
                  cy="0"
                  r="65"
                  fill="#5BA8F7"
                  opacity="0.15"
                  filter="url(#processGlow)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="#5BA8F7"
                  opacity="0.2"
                  filter="url(#processGlow)"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="70"
                  fontWeight="900"
                  fill="#5BA8F7"
                  filter="url(#processGlow)"
                >
                  4
                </text>
              </g>
              <foreignObject x="1030" y="240" width="300" height="100">
                <div style={{
                  direction: locale === 'ar' ? 'rtl' : 'ltr',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {t("about.steps.testing.title")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.testing.line1")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.testing.line2")}
                  </div>
                </div>
              </foreignObject>

              {/* Step 5 - Training */}
              <g transform="translate(1500, 160)">
                <circle
                  cx="0"
                  cy="0"
                  r="65"
                  fill="#4ECFFC"
                  opacity="0.15"
                  filter="url(#processGlow)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="#4ECFFC"
                  opacity="0.2"
                  filter="url(#processGlow)"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="70"
                  fontWeight="900"
                  fill="#4ECFFC"
                  filter="url(#processGlow)"
                >
                  5
                </text>
              </g>
              <foreignObject x="1350" y="260" width="300" height="100">
                <div style={{
                  direction: locale === 'ar' ? 'rtl' : 'ltr',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {t("about.steps.training.title")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.training.line1")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.training.line2")}
                  </div>
                </div>
              </foreignObject>

              {/* Step 6 - Support */}
              <g transform="translate(1820, 225)">
                <circle
                  cx="0"
                  cy="0"
                  r="65"
                  fill="#4EF0FF"
                  opacity="0.15"
                  filter="url(#processGlow)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="#4EF0FF"
                  opacity="0.2"
                  filter="url(#processGlow)"
                />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="70"
                  fontWeight="900"
                  fill="#4EF0FF"
                  filter="url(#processGlow)"
                >
                  6
                </text>
              </g>
              <foreignObject x="1670" y="325" width="300" height="100">
                <div style={{
                  direction: locale === 'ar' ? 'rtl' : 'ltr',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {t("about.steps.support.title")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.support.line1")}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {t("about.steps.support.line2")}
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative z-10 py-20"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("services.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("services.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("services.subheading")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: t("services.items.automation.title"),
                description: t("services.items.automation.description"),
                features: t("services.items.automation.features"),
              },
              {
                title: t("services.items.analytics.title"),
                description: t("services.items.analytics.description"),
                features: t("services.items.analytics.features"),
              },
              {
                title: t("services.items.industry.title"),
                description: t("services.items.industry.description"),
                features: t("services.items.industry.features"),
              },
              {
                title: t("services.items.llm.title"),
                description: t("services.items.llm.description"),
                features: t("services.items.llm.features"),
              },
              {
                title: t("services.items.endToEnd.title"),
                description: t("services.items.endToEnd.description"),
                features: t("services.items.endToEnd.features"),
              },
              {
                title: t("services.items.webMobile.title"),
                description: t("services.items.webMobile.description"),
                features: t("services.items.webMobile.features"),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(24, 27, 53, 0.4)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(88, 97, 242, 0.2)",
                  boxShadow: "0 0 20px rgba(88, 97, 242, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(88, 97, 242, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(88, 97, 242, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(88, 97, 242, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(88, 97, 242, 0.2)";
                }}
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#E44CFF] to-[#5861F2] bg-clip-text text-transparent">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map(
                    (feature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-300"
                      >
                        <Check className="w-4 h-4 text-[#4EF0FF] mr-3 drop-shadow-[0_0_6px_rgba(78,240,255,0.6)]" />
                        {feature}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section
        id="packages"
        className="relative z-10 py-20"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("packages.heading")}{" "}
            <span className="bg-gradient-to-r from-[#E44CFF] via-[#5861F2] to-[#4EF0FF] bg-clip-text text-transparent">
              {t("packages.headingHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            {t("packages.subheading")}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t("packages.starter.name"),
                price: t("packages.starter.price"),
                period: t("packages.starter.period"),
                description: t("packages.starter.description"),
                features: t("packages.starter.features"),
                popular: false,
                cta: t("packages.starter.cta"),
              },
              {
                name: t("packages.professional.name"),
                price: t("packages.professional.price"),
                period: t("packages.professional.period"),
                description: t("packages.professional.description"),
                features: t("packages.professional.features"),
                popular: true,
                popularText: t("packages.professional.popular"),
                cta: t("packages.professional.cta"),
              },
              {
                name: t("packages.enterprise.name"),
                price: t("packages.enterprise.price"),
                period: t("packages.enterprise.period"),
                description: t("packages.enterprise.description"),
                features: t("packages.enterprise.features"),
                popular: false,
                cta: t("packages.enterprise.cta"),
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className="relative p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: pkg.popular
                    ? "rgba(228, 76, 255, 0.1)"
                    : "rgba(24, 27, 53, 0.4)",
                  backdropFilter: "blur(20px)",
                  border: pkg.popular
                    ? "2px solid rgba(228, 76, 255, 0.4)"
                    : "1px solid rgba(88, 97, 242, 0.2)",
                  boxShadow: pkg.popular
                    ? "0 0 50px rgba(228, 76, 255, 0.3)"
                    : "0 0 20px rgba(88, 97, 242, 0.1)",
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{
                        background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                        boxShadow: "0 0 20px rgba(228, 76, 255, 0.5)",
                      }}
                    >
                      {pkg.popularText}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                    {pkg.price}
                  </span>
                  <span className="text-gray-500">{pkg.period}</span>
                </div>
                <p className="text-gray-300 mb-8">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature: string, featureIndex: number) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="w-4 h-4 text-[#4EF0FF] mr-3 drop-shadow-[0_0_6px_rgba(78,240,255,0.6)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={
                    pkg.popular
                      ? {
                          background:
                            "linear-gradient(135deg, #E44CFF, #5861F2)",
                          boxShadow: "0 0 30px rgba(228, 76, 255, 0.4)",
                        }
                      : {
                          border: "1px solid rgba(228, 76, 255, 0.3)",
                          background: "transparent",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #E44CFF, #5861F2)";
                      e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(228, 76, 255, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Customers Section */}
      <section
        id="customers"
        className="relative z-10 py-20"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("customers.heading")}{" "}
            <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
              {t("customers.headingHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            {t("customers.subheading")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: t("customers.types.small.title"),
                desc: t("customers.types.small.desc"),
              },
              {
                title: t("customers.types.mid.title"),
                desc: t("customers.types.mid.desc"),
              },
              {
                title: t("customers.types.enterprise.title"),
                desc: t("customers.types.enterprise.desc"),
              },
            ].map((customer, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(24, 27, 53, 0.4)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(228, 76, 255, 0.2)",
                  boxShadow: "0 0 20px rgba(228, 76, 255, 0.1)",
                }}
              >
                <h3 className="text-xl font-bold mb-3 text-[#E44CFF]">
                  {customer.title}
                </h3>
                <p className="text-gray-300">{customer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-24">
        <div className="w-full">
          {/* Section Heading - Outside the visual container */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-300 mb-4">
              {t("community.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("community.title")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("community.highlight")}
              </span>
            </h2>
          </div>

          <div
            className="relative overflow-hidden px-6 py-16 md:px-12"
            style={{
              background: "rgba(24, 27, 53, 0.3)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="absolute inset-0">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1520px] h-[1520px] md:w-[1720px] md:h-[1720px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.15)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1280px] h-[1280px] md:w-[1480px] md:h-[1480px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.12)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[960px] h-[960px] md:w-[1160px] md:h-[1160px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.11)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] md:w-[840px] md:h-[840px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.1)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(228, 76, 255, 0.08), transparent 55%)",
                }}
              />
              {orbitDots.map((dot, index) => (
                <div
                  key={index}
                  className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                  style={{
                    left: dot.left,
                    top: dot.top,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>

            <div className="relative h-[1600px] md:h-[1840px]">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <button
                  className="px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-[1.05]"
                  style={{
                    background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: "0 0 30px rgba(228, 76, 255, 0.4)",
                  }}
                >
                  {t("community.cta")}
                </button>
              </div>

              {communityMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="absolute left-1/2 top-1/2 orbital-item"
                  style={{
                    animation: `orbit ${member.duration}s linear infinite`,
                    animationDelay: `${
                      -(member.initialAngle / 360) * member.duration
                    }s`,
                    width: `${member.orbit * 2}px`,
                    height: `${member.orbit * 2}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 rounded-full px-3 py-2 absolute top-0 left-1/2"
                    style={{
                      width: member.badgeWidth,
                      animation: `counter-rotate ${member.duration}s linear infinite`,
                      animationDelay: `${
                        -(member.initialAngle / 360) * member.duration
                      }s`,
                      transform: "translate(-50%, -50%)",
                      background: "rgba(24, 27, 53, 0.8)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(228, 76, 255, 0.3)",
                      boxShadow: "0 0 20px rgba(228, 76, 255, 0.2)",
                    }}
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ border: "2px solid rgba(228, 76, 255, 0.5)" }}
                      />
                      <span
                        className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full bg-[#4EF0FF]"
                        style={{
                          boxShadow: "0 0 10px rgba(78, 240, 255, 0.8)",
                        }}
                      />
                    </div>
                    <div className="leading-tight text-left">
                      <div className="text-sm font-semibold text-white">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-[#E44CFF]">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {floatingAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 orbital-item"
                  style={{
                    animation: `orbit ${avatar.duration}s linear infinite`,
                    animationDelay: `${
                      -(avatar.initialAngle / 360) * avatar.duration
                    }s`,
                    width: `${avatar.orbit * 2}px`,
                    height: `${avatar.orbit * 2}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="rounded-full p-1 absolute top-0 left-1/2"
                    style={{
                      animation: `counter-rotate ${avatar.duration}s linear infinite`,
                      animationDelay: `${
                        -(avatar.initialAngle / 360) * avatar.duration
                      }s`,
                      transform: "translate(-50%, -50%)",
                      border: "1px solid rgba(228, 76, 255, 0.3)",
                      background: "rgba(24, 27, 53, 0.6)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 0 20px rgba(228, 76, 255, 0.15)",
                    }}
                  >
                    <img
                      src={avatar.image}
                      alt="Community member"
                      className="rounded-full object-cover"
                      style={{ width: avatar.size, height: avatar.size }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative z-10 py-20"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("contact.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("contact.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t("contact.subheading")}
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "rgba(24, 27, 53, 0.4)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(228, 76, 255, 0.2)",
              boxShadow: "0 0 40px rgba(228, 76, 255, 0.15)",
            }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#E44CFF]">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-xl focus:outline-none transition-all text-white"
                    style={{
                      background: "rgba(10, 15, 42, 0.6)",
                      border: "1px solid rgba(228, 76, 255, 0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.5)";
                      e.target.style.boxShadow =
                        "0 0 20px rgba(228, 76, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#E44CFF]">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 rounded-xl focus:outline-none transition-all text-white"
                    style={{
                      background: "rgba(10, 15, 42, 0.6)",
                      border: "1px solid rgba(228, 76, 255, 0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.5)";
                      e.target.style.boxShadow =
                        "0 0 20px rgba(228, 76, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#E44CFF]">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows={6}
                  className="w-full p-4 rounded-xl focus:outline-none transition-all text-white resize-none"
                  style={{
                    background: "rgba(10, 15, 42, 0.6)",
                    border: "1px solid rgba(228, 76, 255, 0.2)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(228, 76, 255, 0.5)";
                    e.target.style.boxShadow =
                      "0 0 20px rgba(228, 76, 255, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(228, 76, 255, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: "0 0 30px rgba(228, 76, 255, 0.4)",
                  }}
                >
                  {t("contact.form.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 px-6"
        style={{
          borderTop: "1px solid rgba(228, 76, 255, 0.2)",
        }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
            {t("footer.company")}
          </div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("footer.description")}
          </p>
          <div
            className="pt-6"
            style={{
              borderTop: "1px solid rgba(228, 76, 255, 0.2)",
            }}
          >
            <p className="text-gray-400">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
