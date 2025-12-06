'use client';

import { useState } from 'react';
import { ChevronDown, Brain, ChartBar as BarChart, Cog, Zap, Code, Smartphone, Check, Star, Mail, Phone, MapPin, Search } from 'lucide-react';
import GrowthGraph from '@/components/GrowthGraph';

export default function Home() {
  const [activePackage, setActivePackage] = useState(1);

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white relative overflow-hidden">
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
            <button className="flex items-center space-x-1 hover:text-[#00d9ff] transition-colors">
              <span>Products</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1 hover:text-[#00d9ff] transition-colors">
              <span>Solutions</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1 hover:text-[#00d9ff] transition-colors">
              <span>Resources</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-1 hover:text-[#00d9ff] transition-colors">
              <span>Devs</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <a href="#enterprise" className="hover:text-[#00d9ff] transition-colors">Enterprise</a>
            <a href="#pricing" className="hover:text-[#00d9ff] transition-colors">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-[#00d9ff] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="px-5 py-2 border border-[#00d9ff] text-[#00d9ff] rounded-md hover:bg-[#00d9ff]/10 transition-all">
              Get A Demo
            </button>
            <button className="px-5 py-2 border border-white/20 text-white rounded-md hover:bg-white/5 transition-all">
              Log In
            </button>
            <button className="px-5 py-2 bg-white text-[#0a0e14] rounded-md hover:bg-gray-100 transition-all font-medium">
              Sign Up Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-[#00ff88] rounded-full opacity-20"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
                animation: `float ${15 + i * 3}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}

          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 30% 40%, rgba(0, 255, 136, 0.03) 0%, transparent 50%)',
              animation: 'pulse-glow 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 70% 60%, rgba(0, 255, 136, 0.03) 0%, transparent 50%)',
              animation: 'pulse-glow 8s ease-in-out infinite',
              animationDelay: '4s',
            }}
          />
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -30px) scale(1.2); }
            50% { transform: translate(-15px, -50px) scale(0.8); }
            75% { transform: translate(25px, -35px) scale(1.1); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.1); }
          }
        `}</style>

        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-2xl p-8 md:p-16 backdrop-blur-sm bg-[#0a0e14]/40"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%)',
              border: '1px solid transparent',
              backgroundClip: 'padding-box',
              position: 'relative',
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, #0066ff 0%, #00e5cc 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />

            <div className="relative z-10 text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Unlock voice AI at
                <br />
                scale with an API Call
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Get conversational intelligence with transcription and understanding on
                the world's best speech AI platform.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <GrowthGraph
                  title="Productivity Growth"
                  value="$33,928.92"
                  increase="+127%"
                  delay={300}
                />
              </div>

              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <GrowthGraph
                  title="Revenue Increase"
                  value="$48,256.14"
                  increase="+184%"
                  delay={500}
                />
              </div>

              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <GrowthGraph
                  title="Workflow Speed"
                  value="$21,442.58"
                  increase="+95%"
                  delay={700}
                />
              </div>

              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <GrowthGraph
                  title="Time Saved"
                  value="$29,873.21"
                  increase="+156%"
                  delay={900}
                />
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