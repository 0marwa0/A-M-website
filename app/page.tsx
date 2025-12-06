'use client';

import { useState } from 'react';
import { Brain, ChartBar as BarChart, Cog, Zap, Code, Smartphone, Check, Star } from 'lucide-react';
import GrowthGraph from '@/components/GrowthGraph';

export default function Home() {
  const translations = {
    en: {
      nav: { solutions: 'Solutions', contact: 'Contact Us', about: 'About Us', pricing: 'Pricing' },
      badge: { first: 'Predict', second: 'Plan', third: 'Perform perfectly' },
      heading1: 'Reimagining Business Success',
      heading2: 'With Scalable AI Solutions',
      subheading: 'Automate tasks, make data-driven decisions, and grow faster with intelligent technology.',
      cta: 'Get Started',
      trust: 'Trusted by businesses of all sizes worldwide.',
      ytd: 'Year to Date',
      monthlyProfit: 'Monthly Profit',
      newClients: 'New Clients',
      thisMonth: 'This month',
      september: 'September',
      performanceScore: 'Performance score',
    },
    ar: {
      nav: { solutions: 'الحلول', contact: 'اتصل بنا', about: 'من نحن', pricing: 'الأسعار' },
      badge: { first: 'تنبأ', second: 'خطط', third: 'نفّذ بإتقان' },
      heading1: 'إعادة تصور نجاح الأعمال',
      heading2: 'بحلول ذكاء اصطناعي قابلة للتوسع',
      subheading: 'أتمت المهام، واتخذ قرارات مبنية على البيانات، وانمُ أسرع مع التكنولوجيا الذكية.',
      cta: 'ابدأ الآن',
      trust: 'موثوق من شركات بكل الأحجام حول العالم.',
      ytd: 'منذ بداية العام',
      monthlyProfit: 'الربح الشهري',
      newClients: 'عملاء جدد',
      thisMonth: 'هذا الشهر',
      september: 'سبتمبر',
      performanceScore: 'درجة الأداء',
    },
  } as const;

  const [locale, setLocale] = useState<'en' | 'ar'>('en');
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white relative overflow-hidden" lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
                width: Math.random() * 1.5 + 0.5 + 'px',
                height: Math.random() * 1.5 + 0.5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
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
                width: Math.random() * 2 + 0.5 + 'px',
                height: Math.random() * 2 + 0.5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
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
                width: Math.random() * 2.5 + 0.5 + 'px',
                height: Math.random() * 2.5 + 0.5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.8 + 0.4,
              }}
            />
          ))}
        </div>

        {/* Subtle Glow Layer - Static */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.03) 0%, transparent 50%)',
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">Trimindes AI</div>
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#services" className="hover:text-[#00d9ff] transition-colors">{t.nav.solutions}</a>
            <a href="#contact" className="hover:text-[#00d9ff] transition-colors">{t.nav.contact}</a>
            <a href="#about" className="hover:text-[#00d9ff] transition-colors">{t.nav.about}</a>
            <a href="#packages" className="hover:text-[#00d9ff] transition-colors">{t.nav.pricing}</a>
          </div>
          <div className="flex items-center">
            <button
              className="px-4 py-2 rounded-md border border-white/15 text-sm hover:border-[#00d9ff] transition-colors"
              onClick={() => setLocale((prev) => (prev === 'en' ? 'ar' : 'en'))}
            >
              {locale === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
        <div className="max-w-6xl mx-auto relative w-full">
          <div className="flex flex-col items-center text-center gap-5">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-[#00d9ff]/30 text-xs uppercase tracking-[0.2em] text-[#00d9ff] shadow-[0_10px_60px_rgba(0,217,255,0.25)]">
              {t.badge.first}
              <span className="h-1 w-1 rounded-full bg-[#00d9ff]" />
              {t.badge.second}
              <span className="h-1 w-1 rounded-full bg-[#00d9ff]" />
              {t.badge.third}
            </span>

            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.35] py-2">
                <span className="block whitespace-nowrap">{t.heading1}</span>
                <span className="block mt-6 whitespace-nowrap">{t.heading2}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {t.subheading}
              </p>
            </div>

            <button className="px-7 py-3 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#6be8ff] text-[#04100a] font-semibold shadow-[0_15px_50px_rgba(0,217,255,0.35)] hover:scale-[1.02] transition-transform">
              {t.cta}
            </button>

            <div className="flex items-center gap-1 text-amber-400 mt-1">
              {[...Array(6)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-gray-300">{t.trust}</p>
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-[0.8fr_1fr] items-start">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                <div className="text-xs text-gray-400 mb-2">{t.ytd}</div>
                <div className="text-2xl font-semibold">$192,092</div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-400">{t.monthlyProfit}</span>
                  <span className="text-[#00d9ff] font-semibold">+11%</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/5">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#00d9ff] to-[#6be8ff]" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{t.newClients}</span>
                  <span>{t.september}</span>
                </div>
                <div className="text-2xl font-semibold text-[#00d9ff]">92</div>
                <p className="text-sm text-gray-400 mt-1">{t.thisMonth}</p>
                <div className="mt-3 h-28 rounded-xl bg-gradient-to-b from-white/5 via-white/0 to-white/5 border border-white/5 flex items-end gap-2 px-3 pb-3">
                  {[55, 38, 72, 44, 68, 92].map((value, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-full bg-gradient-to-t from-[#00d9ff]/35 to-[#6be8ff]/70 shadow-[0_10px_30px_rgba(0,217,255,0.25)]"
                      style={{ height: `${Math.max(value, 24)}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_30px_110px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>{t.monthlyProfit}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">{t.september}</span>
              </div>
              <div className="mt-2 text-2xl font-semibold">$33,828.82</div>
              <div className="mt-6 h-40 rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 10% 80%, rgba(0,217,255,0.25), transparent 55%)' }} />
                <svg viewBox="0 0 200 100" className="absolute inset-0" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="profit-line" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#6be8ff" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 70 C 30 40, 50 30, 75 55 S 130 90, 200 42"
                    fill="none"
                    stroke="url(#profit-line)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_18px_rgba(74,222,128,0.35)]"
                  />
                  <circle cx="200" cy="42" r="6" fill="#6be8ff" />
                  <circle cx="200" cy="42" r="14" fill="#6be8ff" opacity="0.15" />
                </svg>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
                <span>{t.performanceScore}</span>
                <span className="text-[#00d9ff] font-semibold">+24%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            About <span className="text-[#00d9ff]">Trimindes AI</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI Automation', desc: 'Streamline operations with intelligent automation solutions' },
              { icon: BarChart, title: 'Analytics & Dashboards', desc: 'Data-driven insights with powerful visualization tools' },
              { icon: Cog, title: 'Industry-Specific AI', desc: 'Tailored AI solutions for your specific industry needs' },
              { icon: Zap, title: 'LLM Integrations', desc: 'Seamlessly integrate language models into existing systems' },
              { icon: Code, title: 'End-to-End Development', desc: 'Complete AI solution development from concept to deployment' },
              { icon: Smartphone, title: 'Web & Mobile Apps', desc: 'Modern applications powered by artificial intelligence' },
            ].map((item, index) => (
              <div key={index} className="p-6 border border-[#00d9ff]/20 rounded-xl backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all transform hover:scale-105">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our <span className="text-[#00d9ff]">Services</span></h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive AI solutions designed to transform your business operations and unlock new possibilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Custom AI Automation',
                description: 'Automate complex workflows and processes with intelligent AI systems tailored to your business needs.',
                features: ['Process Optimization', 'Workflow Automation', 'Smart Decision Making', 'Cost Reduction']
              },
              {
                title: 'AI-Powered Analytics',
                description: 'Transform raw data into actionable insights with advanced analytics and predictive modeling.',
                features: ['Predictive Analytics', 'Real-time Dashboards', 'Data Visualization', 'Business Intelligence']
              },
              {
                title: 'Industry-Specific AI Solutions',
                description: 'Specialized AI applications designed for healthcare, finance, education, and other industries.',
                features: ['Healthcare AI', 'Financial AI', 'Educational AI', 'Custom Industry Solutions']
              },
              {
                title: 'LLM Integration With Existing Systems',
                description: 'Seamlessly integrate large language models into your current technology infrastructure.',
                features: ['API Integration', 'Legacy System Updates', 'Custom Training', 'Performance Optimization']
              },
              {
                title: 'End-to-End AI Development',
                description: 'Complete AI solution development from initial concept through deployment and maintenance.',
                features: ['Concept to Deployment', 'AI Strategy', 'Model Training', 'Ongoing Support']
              },
              {
                title: 'Website & Mobile App Development',
                description: 'Modern, AI-enhanced applications that provide exceptional user experiences.',
                features: ['Responsive Design', 'AI Integration', 'Mobile Optimization', 'User Experience']
              }
            ].map((service, index) => (
              <div key={index} className="p-8 border border-[#00d9ff]/20 rounded-xl backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-[#00d9ff]">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-400">
                      <Check className="w-4 h-4 text-[#00d9ff] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your <span className="text-[#00d9ff]">Package</span></h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Flexible pricing options designed to meet the needs of businesses at every stage of their AI journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter Package',
                price: '$2,999',
                period: '/month',
                description: 'Perfect for small businesses starting their AI journey',
                features: [
                  'Basic AI Automation',
                  'Standard Analytics Dashboard',
                  'Email Support',
                  'Monthly Strategy Session',
                  'Basic LLM Integration'
                ],
                popular: false
              },
              {
                name: 'Professional Package',
                price: '$7,999',
                period: '/month',
                description: 'Comprehensive AI solutions for growing companies',
                features: [
                  'Advanced AI Automation',
                  'Custom Analytics Dashboard',
                  'Priority Support',
                  'Weekly Strategy Sessions',
                  'Custom LLM Training',
                  'Mobile App Development',
                  'API Integrations'
                ],
                popular: true
              },
              {
                name: 'Enterprise Package',
                price: 'Custom',
                period: '',
                description: 'Tailored solutions for large-scale operations',
                features: [
                  'Full AI Ecosystem',
                  'Enterprise Analytics',
                  '24/7 Dedicated Support',
                  'Daily Consultations',
                  'Custom AI Model Development',
                  'Multi-platform Applications',
                  'Complete System Integration',
                  'On-site Training'
                ],
                popular: false
              }
            ].map((pkg, index) => (
              <div key={index} className={`relative p-8 rounded-xl backdrop-blur-sm transition-all transform hover:scale-105 ${
                pkg.popular
                  ? 'border-2 border-[#00d9ff] bg-[#0a0e14]/60 shadow-2xl shadow-[#00d9ff]/20'
                  : 'border border-[#00d9ff]/20 bg-[#0a0e14]/60 hover:border-[#00d9ff]/40'
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#00d9ff] text-[#0a0e14] px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#00d9ff]">{pkg.price}</span>
                  <span className="text-gray-500">{pkg.period}</span>
                </div>
                <p className="text-gray-400 mb-8">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-400">
                      <Check className="w-4 h-4 text-[#00d9ff] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  pkg.popular
                    ? 'bg-[#00d9ff] text-[#0a0e14] hover:bg-[#00c5e6]'
                    : 'border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-[#0a0e14]'
                }`}>
                  {pkg.name === 'Enterprise Package' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Customers Section */}
      <section id="customers" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We <span className="text-[#00d9ff]">Serve</span></h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Trimindes AI partners with organizations across industries to deliver transformative AI solutions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'Small Businesses', desc: 'Affordable AI solutions to compete with larger competitors' },
              { title: 'Mid-sized Companies', desc: 'Scalable AI systems that grow with your business' },
              { title: 'Enterprise Organizations', desc: 'Complex AI ecosystems for large-scale operations' },
            ].map((customer, index) => (
              <div key={index} className="p-6 border border-[#00d9ff]/20 rounded-xl backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all">
                <h3 className="text-xl font-bold mb-3 text-[#00d9ff]">{customer.title}</h3>
                <p className="text-gray-400">{customer.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8">Industries We Specialize In</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {['Education', 'Real Estate', 'Healthcare', 'Logistics', 'Finance'].map((industry, index) => (
                <div key={index} className="p-4 border border-[#00d9ff]/20 rounded-lg backdrop-blur-sm bg-[#0a0e14]/60 hover:border-[#00d9ff]/40 transition-all transform hover:scale-105">
                  <span className="font-semibold text-[#00d9ff]">{industry}</span>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In <span className="text-[#00d9ff]">Touch</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to transform your business with AI? Let's discuss how Trimindes AI can help you achieve your goals.
            </p>
          </div>

          <div className="border border-[#00d9ff]/20 rounded-xl p-8 md:p-12 backdrop-blur-sm bg-[#0a0e14]/60">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#00d9ff]">Name</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-[#0a0e14] border border-[#00d9ff]/30 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors text-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#00d9ff]">Email</label>
                  <input
                    type="email"
                    className="w-full p-4 bg-[#0a0e14] border border-[#00d9ff]/30 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#00d9ff]">Message</label>
                <textarea
                  rows={6}
                  className="w-full p-4 bg-[#0a0e14] border border-[#00d9ff]/30 rounded-lg focus:border-[#00d9ff] focus:outline-none transition-colors text-white resize-none"
                  placeholder="Tell us about your AI needs and goals..."
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#00d9ff] text-[#0a0e14] text-lg font-semibold rounded-lg hover:bg-[#00c5e6] transition-all transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00d9ff]/20 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-6">Trimindes AI</div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Transforming businesses with cutting-edge artificial intelligence solutions.
            Your partner in the AI revolution.
          </p>
          <div className="border-t border-[#00d9ff]/20 pt-6">
            <p className="text-gray-500">
              © 2025 Trimindes AI. All rights reserved. | Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
