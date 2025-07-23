export const websiteExamples = {
  saasLanding: `
// SaaS Landing Page Example
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
  {/* Hero Section */}
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Animated Background */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center transform transition-all duration-1000 opacity-100 translate-y-0">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm mb-8 border border-white/20">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
        </svg>
        Now in Beta
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
        Build faster with
        <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          intelligent tools
        </span>
      </h1>
      
      <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
        Transform your workflow with AI-powered solutions that adapt to your needs and scale with your business.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25 flex items-center gap-2">
          Start free trial
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 border border-white/20 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
          Watch demo
        </button>
      </div>
    </div>
  </section>

  {/* Features Section */}
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Everything you need to succeed
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Powerful features designed to streamline your workflow and boost productivity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="group p-8 bg-slate-50 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100">
          <div className="w-14 h-14 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
            <div className="text-blue-600 group-hover:text-white transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning Fast</h3>
          <p className="text-slate-600 leading-relaxed">Optimized performance with sub-second response times</p>
        </div>
        
        <div className="group p-8 bg-slate-50 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100">
          <div className="w-14 h-14 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
            <div className="text-blue-600 group-hover:text-white transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Enterprise Security</h3>
          <p className="text-slate-600 leading-relaxed">Bank-level encryption and compliance standards</p>
        </div>
        
        <div className="group p-8 bg-slate-50 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100">
          <div className="w-14 h-14 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
            <div className="text-blue-600 group-hover:text-white transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Global Scale</h3>
          <p className="text-slate-600 leading-relaxed">Deploy worldwide with our distributed infrastructure</p>
        </div>
      </div>
    </div>
  </section>
</div>`,

  agencyPortfolio: `
// Agency Portfolio Example
<div className="min-h-screen bg-black text-white overflow-hidden">
  {/* Hero */}
  <section className="min-h-screen flex items-center justify-center relative">
    <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-black opacity-80"></div>
    
    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <div className="overflow-hidden">
        <h1 className="text-6xl md:text-8xl font-light mb-8 animate-fade-in-up">
          We craft
          <span className="font-bold italic"> digital</span>
          <br />experiences
        </h1>
      </div>
      
      <div className="overflow-hidden">
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto animate-fade-in-up">
          An award-winning creative agency specializing in brand identity, web design, and digital experiences.
        </p>
      </div>

      <div className="animate-fade-in-up">
        <button className="group relative px-12 py-4 border border-white/20 rounded-full overflow-hidden transition-all duration-500 hover:border-white">
          <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
            View our work
          </span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>
      </div>
    </div>

    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="w-full h-full" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  </section>

  {/* Work Grid */}
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="group relative aspect-square bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-2">Project 1</h3>
              <p className="text-slate-400">Brand Identity</p>
            </div>
          </div>
        </div>
        
        <div className="group relative aspect-square bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-2">Project 2</h3>
              <p className="text-slate-400">Web Design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <style jsx>{\`
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.8s ease-out forwards;
      opacity: 0;
    }
  \`}</style>
</div>`,

  productShowcase: `
// Product Showcase Example
<div className="min-h-screen bg-slate-50">
  {/* Hero Product */}
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
    
    {/* Floating Elements */}
    <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-200/30 rounded-2xl rotate-12 animate-float"></div>
    <div className="absolute top-1/3 right-10 w-16 h-16 bg-purple-200/30 rounded-full animate-float-delayed"></div>
    <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-pink-200/30 rounded-lg rotate-45 animate-float"></div>

    <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
          ✨ New features available
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          The future of
          <span className="text-blue-600"> productivity</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          Experience seamless workflow management with our next-generation platform designed for modern teams.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 transform hover:-translate-y-0.5">
            Get started free
          </button>
          <button className="px-8 py-4 text-slate-700 hover:text-slate-900 font-medium transition-colors">
            Schedule demo →
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              </div>
              <div className="text-sm opacity-80">Dashboard</div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse delay-100"></div>
              <div className="h-4 bg-white/20 rounded w-2/3 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl -rotate-12 opacity-80"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-80"></div>
      </div>
    </div>
  </section>

  {/* Interactive Features */}
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Powerful features</h2>
        <p className="text-xl text-slate-600">Everything you need in one place</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl cursor-pointer transition-all duration-300 bg-blue-50 border-2 border-blue-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Intuitive Design</h3>
            <p className="text-slate-600">Clean interface that users love</p>
          </div>
          <div className="p-6 rounded-2xl cursor-pointer transition-all duration-300 bg-slate-50 hover:bg-slate-100 border-2 border-transparent">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Real-time Sync</h3>
            <p className="text-slate-600">Updates across all devices instantly</p>
          </div>
          <div className="p-6 rounded-2xl cursor-pointer transition-all duration-300 bg-slate-50 hover:bg-slate-100 border-2 border-transparent">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Analytics</h3>
            <p className="text-slate-600">Insights that drive better decisions</p>
          </div>
        </div>

        <div className="relative">
          <div className="bg-slate-100 rounded-3xl p-8 h-96 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transition-all duration-500">
              Feature Demo
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <style jsx>{\`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(12deg); }
      50% { transform: translateY(-20px) rotate(12deg); }
    }
    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float-delayed 4s ease-in-out infinite 2s;
    }
  \`}</style>
</div>`,

  techStartup: `
// Tech Startup Example
<div className="min-h-screen bg-slate-900">
  {/* Hero */}
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Animated Grid */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div 
        className="w-full h-full opacity-20" 
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          animation: 'grid-move 20s linear infinite'
        }}
      ></div>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center transform transition-all duration-1000 opacity-100 translate-y-0">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-cyan-300 text-sm mb-8 border border-cyan-500/30">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        Now Live
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
        Next-gen
        <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Platform
        </span>
      </h1>
      
      <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
        Harness the power of artificial intelligence to automate workflows, analyze data, and accelerate innovation.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            Start building
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </button>
        <button className="px-8 py-4 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg font-medium transition-all duration-300">
          Documentation
        </button>
      </div>
    </div>

    {/* Floating Code Blocks */}
    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 animate-float">
        <div className="text-cyan-400 text-sm font-mono">
          {'{ "ai": "enabled" }'}
        </div>
      </div>
    </div>
    
    <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 animate-float-delayed">
        <div className="text-green-400 text-sm font-mono">
          200 OK
        </div>
      </div>
    </div>
  </section>

  {/* Stats */}
  <section className="py-24 bg-slate-800/50">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
          <div className="text-slate-400">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
          <div className="text-slate-400">API Calls</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
          <div className="text-slate-400">Customers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
          <div className="text-slate-400">Support</div>
        </div>
      </div>
    </div>
  </section>

  <style jsx>{\`
    @keyframes grid-move {
      0% { transform: translate(0, 0); }
      100% { transform: translate(100px, 100px); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float-delayed 5s ease-in-out infinite 1s;
    }
  \`}</style>
</div>`
};

export const formatExamplesForPrompt = () => {
  return `
REFERENCE EXAMPLES - Study these complete website patterns:

=== SAAS LANDING PAGE EXAMPLE ===
${websiteExamples.saasLanding}

=== AGENCY PORTFOLIO EXAMPLE ===
${websiteExamples.agencyPortfolio}

=== PRODUCT SHOWCASE EXAMPLE ===
${websiteExamples.productShowcase}

=== TECH STARTUP EXAMPLE ===
${websiteExamples.techStartup}

CRITICAL PATTERNS TO FOLLOW:
- Multiple sections (hero, features, stats, testimonials, etc.)
- Specific color values (bg-blue-600, text-slate-900, from-cyan-400)
- Gradient backgrounds and text effects
- Hover animations (hover:scale-105, group-hover effects)
- Floating/animated elements
- Professional typography hierarchy
- Modern card designs with shadows
- Proper spacing and layout structure
- CSS animations with @keyframes
`;
}; 