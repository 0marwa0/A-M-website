"use client";

import {
  Brain,
  ChartBar as BarChart,
  Cog,
  Zap,
  Code,
  Smartphone,
  Check,
  Star,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import FlowCanvas from "@/components/FlowCanvas";

export default function Home() {
  const { locale, setLocale, t } = useI18n();

  const communityMembers = [
    {
      name: "Syed Muhammad Haris",
      role: "CEO HiBOON",
      position: { left: "42%", top: "44%" },
      badgeWidth: "15rem",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=120&h=120&q=80",
    },
    {
      name: "Malik Murtaza",
      role: "CEO HiBOON",
      position: { left: "74%", top: "30%" },
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=120&h=120&q=80",
    },
    {
      name: "Haseeb Arshad",
      role: "Sales Assistant",
      position: { left: "25%", top: "70%" },
      badgeWidth: "14.5rem",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&w=120&h=120&q=80",
    },
    {
      name: "Saffuan Mushtaq",
      role: "Junior Developer",
      position: { left: "79%", top: "57%" },
      badgeWidth: "14rem",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=120&h=120&q=80",
    },
  ];

  const floatingAvatars = [
    {
      position: { left: "52%", top: "12%" },
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=facearea&w=120&h=120&q=80",
    },
    {
      position: { left: "16%", top: "35%" },
      size: "56px",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=120&h=120&q=80",
    },
    {
      position: { left: "68%", top: "82%" },
      size: "54px",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=120&h=120&q=80",
    },
    {
      position: { left: "32%", top: "86%" },
      size: "50px",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=120&h=120&q=80",
    },
    {
      position: { left: "88%", top: "44%" },
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=facearea&w=120&h=120&q=80",
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
      className="min-h-screen bg-[#0a0e14] text-white relative overflow-hidden"
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Animated Starfield Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0e14]"></div>

        {/* Gradient Layer - Static */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1a1f] to-transparent opacity-40"></div>

        {/* Star Layers - Static */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`far-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 1.5 + 0.5 + "px",
                height: Math.random() * 1.5 + 0.5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.4 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`mid-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 0.5 + "px",
                height: Math.random() * 2 + 0.5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.6 + 0.3,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`near-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2.5 + 0.5 + "px",
                height: Math.random() * 2.5 + 0.5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.8 + 0.4,
              }}
            />
          ))}
        </div>

        {/* Subtle Glow Layer - Static */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.03) 0%, transparent 50%)",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logoo.svg"
              alt="Trimindes AI Logo"
              className="h-12 w-12"
            />
            <div className="text-2xl font-bold tracking-tight">
              Trimindes AI
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#services"
              className="hover:text-[#00d9ff] transition-colors"
            >
              {t("nav.solutions")}
            </a>
            <a
              href="#contact"
              className="hover:text-[#00d9ff] transition-colors"
            >
              {t("nav.contact")}
            </a>
            <a href="#about" className="hover:text-[#00d9ff] transition-colors">
              {t("nav.about")}
            </a>
            <a
              href="#packages"
              className="hover:text-[#00d9ff] transition-colors"
            >
              {t("nav.pricing")}
            </a>
          </div>
          <div className="flex items-center">
            <button
              className="px-4 py-2 rounded-md border border-white/15 text-sm hover:border-[#00d9ff] transition-colors"
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
        className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative w-full">
          <div className="flex flex-col items-center text-center gap-5">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-[#00d9ff]/30 text-xs uppercase tracking-[0.2em] text-[#00d9ff] shadow-[0_10px_60px_rgba(0,217,255,0.25)]">
              {t("hero.badge.first")}
              <span className="h-1 w-1 rounded-full bg-[#00d9ff]" />
              {t("hero.badge.second")}
              <span className="h-1 w-1 rounded-full bg-[#00d9ff]" />
              {t("hero.badge.third")}
            </span>

            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.35] py-2">
                <span className="block">
                  {t("hero.heading1")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {t("hero.subheading")}
              </p>
            </div>

            <button className="px-7 py-3 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#6be8ff] text-[#04100a] font-semibold shadow-[0_15px_50px_rgba(0,217,255,0.35)] hover:scale-[1.02] transition-transform">
              {t("hero.cta")}
            </button>

            <div className="flex items-center gap-1 text-amber-400 mt-1">
              {[...Array(6)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-gray-300">{t("hero.trust")}</p>
          </div>
        </div>
      </section>

      {/* Flow Map Section */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#0a0e14]/80 backdrop-blur shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Intelligent Workflows
          </h3>
          <FlowCanvas />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            {t("about.heading")}{" "}
            <span className="text-[#00d9ff]">{t("about.company")}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: t("about.services.aiAutomation.title"),
                desc: t("about.services.aiAutomation.desc"),
              },
              {
                icon: BarChart,
                title: t("about.services.analytics.title"),
                desc: t("about.services.analytics.desc"),
              },
              {
                icon: Cog,
                title: t("about.services.industryAI.title"),
                desc: t("about.services.industryAI.desc"),
              },
              {
                icon: Zap,
                title: t("about.services.llm.title"),
                desc: t("about.services.llm.desc"),
              },
              {
                icon: Code,
                title: t("about.services.development.title"),
                desc: t("about.services.development.desc"),
              },
              {
                icon: Smartphone,
                title: t("about.services.apps.title"),
                desc: t("about.services.apps.desc"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 border border-[#00d9ff]/20 rounded-xl backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all transform hover:scale-105"
              >
                <item.icon className="w-12 h-12 text-[#00d9ff] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("services.heading")}{" "}
              <span className="text-[#00d9ff]">
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
                className="p-8 border border-[#00d9ff]/20 rounded-xl backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold mb-4 text-[#00d9ff]">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map(
                    (feature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-400"
                      >
                        <Check className="w-4 h-4 text-[#00d9ff] mr-3" />
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
      <section id="packages" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("packages.heading")}{" "}
            <span className="text-[#00d9ff]">
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
                className={`relative p-8 rounded-xl backdrop-blur-sm transition-all transform hover:scale-105 ${
                  pkg.popular
                    ? "border-2 border-[#00d9ff] bg-[#0a0e14]/60 shadow-2xl shadow-[#00d9ff]/20"
                    : "border border-[#00d9ff]/20 bg-[#0a0e14]/60 hover:border-[#00d9ff]/40"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#00d9ff] text-[#0a0e14] px-4 py-2 rounded-full text-sm font-bold">
                      {pkg.popularText}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#00d9ff]">
                    {pkg.price}
                  </span>
                  <span className="text-gray-500">{pkg.period}</span>
                </div>
                <p className="text-gray-400 mb-8">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature: string, featureIndex: number) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-400"
                    >
                      <Check className="w-4 h-4 text-[#00d9ff] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    pkg.popular
                      ? "bg-[#00d9ff] text-[#0a0e14] hover:bg-[#00c5e6]"
                      : "border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-[#0a0e14]"
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Customers Section */}
      <section id="customers" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("customers.heading")}{" "}
            <span className="text-[#00d9ff]">
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
                className="p-6 border border-[#00d9ff]/20 rounded-xl backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 text-[#00d9ff]">
                  {customer.title}
                </h3>
                <p className="text-gray-400">{customer.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8">
              {t("customers.industries.heading")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                t("customers.industries.education"),
                t("customers.industries.realEstate"),
                t("customers.industries.healthcare"),
                t("customers.industries.logistics"),
                t("customers.industries.finance"),
              ].map((industry, index) => (
                <div
                  key={index}
                  className="p-4 border border-[#00d9ff]/20 rounded-lg backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all transform hover:scale-105"
                >
                  <span className="font-semibold text-[#00d9ff]">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[32px] border border-[#00d9ff]/15 bg-gradient-to-b from-[#0f1724]/80 via-[#0d1420]/70 to-[#0a0e14]/90 shadow-[0_30px_120px_rgba(0,0,0,0.45)] px-6 py-16 md:px-12">
            <div className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[620px] md:h-[620px] border border-[#00d9ff]/15 rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] md:w-[450px] md:h-[450px] border border-[#00d9ff]/12 rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[300px] md:h-[300px] border border-[#00d9ff]/10 rounded-full" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.08),transparent_55%)]" />
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

            <div className="relative h-[560px] md:h-[680px]">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-gray-300">
                  {t("community.kicker")}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="block text-white">{t("community.title")}</span>
                  <span className="block text-[#00d9ff]">
                    {t("community.highlight")}
                  </span>
                </h2>
                <button className="px-7 py-3 rounded-full bg-[#00d9ff] text-[#04100a] font-semibold shadow-[0_15px_40px_rgba(0,217,255,0.35)] hover:bg-[#06c6e3] transition-all hover:scale-[1.03]">
                  {t("community.cta")}
                </button>
              </div>

              {communityMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="absolute"
                  style={{
                    left: member.position.left,
                    top: member.position.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 rounded-full bg-[#0c151d]/90 border border-[#00d9ff]/25 px-3 py-2 backdrop-blur shadow-[0_10px_40px_rgba(0,217,255,0.15)]"
                    style={{ width: member.badgeWidth }}
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#00d9ff]/60"
                      />
                      <span className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full bg-[#00d9ff] shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
                    </div>
                    <div className="leading-tight text-left">
                      <div className="text-sm font-semibold text-white">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-[#9adfff]">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {floatingAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: avatar.position.left,
                    top: avatar.position.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="rounded-full border border-[#00d9ff]/30 p-1 bg-[#0c151d]/80 shadow-[0_10px_30px_rgba(0,217,255,0.12)]">
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
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("contact.heading")}{" "}
              <span className="text-[#00d9ff]">
                {t("contact.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t("contact.subheading")}
            </p>
          </div>

          <div className="border border-[#00d9ff]/20 rounded-xl p-8 md:p-12 backdrop-blur-sm bg-[#0a0e14]/60">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#00d9ff]">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-[#0a0e14] border border-[#00d9ff]/30 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors text-white"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#00d9ff]">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 bg-[#0a0e14] border border-[#00d9ff]/30 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors text-white"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#00d9ff]">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows={6}
                  className="w-full p-4 bg-[#0a0e14] border border-[#00d9ff]/30 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors text-white resize-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#00d9ff] text-[#0a0e14] text-lg font-semibold rounded-lg hover:bg-[#00c5e6] transition-all transform hover:scale-105"
                >
                  {t("contact.form.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00d9ff]/20 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-6">{t("footer.company")}</div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("footer.description")}
          </p>
          <div className="border-t border-[#00d9ff]/20 pt-6">
            <p className="text-gray-500">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
