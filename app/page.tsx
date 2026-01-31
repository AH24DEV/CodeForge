'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Code, Sparkles, Download, Copy, Settings, Share2, Zap, Play, Pause, Volume2, VolumeX, ArrowRight, Layout, Monitor, Smartphone } from 'lucide-react';

const DEMO_EXAMPLES = [
  {
    id: 'landing',
    title: 'SaaS Landing Page',
    icon: <Layout className="w-8 h-8 text-cyan-400" />,
    description: 'Modern hero section with gradient text and CTA buttons.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    code: `export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Nexus</div>
        <div className="space-x-4">
          <a href="#" className="hover:text-blue-400">Features</a>
          <a href="#" className="hover:text-blue-400">Pricing</a>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">Get Started</button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          Build faster with <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Generate production-ready code from your designs in seconds. Stop writing boilerplate.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition">Start Free Trial</button>
          <button className="px-8 py-3 border border-gray-700 rounded-lg font-bold hover:bg-gray-800 transition">View Demo</button>
        </div>
      </main>
    </div>
  );
}`
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    icon: <Monitor className="w-8 h-8 text-yellow-300" />,
    description: 'Dark mode analytics dashboard with stat cards and grid layout.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    code: `export default function Dashboard() {
  return (
    <div className="p-8 bg-black min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Total Users', value: '12,345', change: '+12%', color: 'blue' },
          { title: 'Revenue', value: '$45,678', change: '+8%', color: 'green' },
          { title: 'Active Sessions', value: '1,234', change: '-3%', color: 'red' }
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 mb-2">{stat.title}</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className={\`text-sm font-medium text-\${stat.color}-400\`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 h-64">
        <div className="bg-gray-900 rounded-xl border border-gray-800"></div>
        <div className="bg-gray-900 rounded-xl border border-gray-800"></div>
      </div>
    </div>
  );
}`
  },
  {
    id: 'mobile',
    title: 'Mobile App Profile',
    icon: <Smartphone className="w-8 h-8 text-magenta-400" />,
    description: 'Clean mobile profile screen with avatar and settings list.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    code: `export default function ProfileScreen() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-br from-pink-500 to-orange-400 h-48 relative">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-lg"></div>
        </div>
      </div>
      <div className="pt-16 pb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Alex Morgan</h2>
        <p className="text-gray-500">Product Designer</p>
      </div>
      <div className="px-6 space-y-4">
        {['Edit Profile', 'Notifications', 'Privacy', 'Help Center'].map((item) => (
          <button key={item} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
            <span className="font-medium text-gray-700">{item}</span>
            <span className="text-gray-400">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}`
  }
];

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [framework, setFramework] = useState('react');
  const [style, setStyle] = useState('tailwind');
  const [quality, setQuality] = useState(2);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Background animation
  useEffect(() => {
    const bgAnimation = document.getElementById('bg-animation');
    let progress = 0;
    const interval = setInterval(() => {
      progress = (progress + 0.5) % 100;
      if (bgAnimation) {
        bgAnimation.style.background = `
          radial-gradient(circle at ${progress}% 50%, rgba(0, 255, 255, 0.3) 0%, transparent 50%),
          radial-gradient(circle at ${100 - progress}% 50%, rgba(255, 0, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, rgba(255, 255, 0, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)
        `;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const loadDemo = (demo: typeof DEMO_EXAMPLES[0]) => {
    setLoading(true);
    setTimeout(() => {
      setImagePreview(demo.image);
      setGeneratedCode(demo.code);
      setActiveTab('preview');
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const generateCode = async () => {
    if (!image) return;

    setLoading(true);
    setGeneratedCode('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            framework,
            style,
            quality
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate code');
        }

        const codeContent = data.content;
        const codeMatch = codeContent.match(/```[\w]*\n([\s\S]*?)```/);
        const code = codeMatch ? codeMatch[1] : codeContent;

        setGeneratedCode(code);
      } catch (error) {
        console.error('Error generating code:', error);
        setGeneratedCode(`// Error generating code: ${(error as Error).message}\n// Please ensure you have set your ANTHROPIC_API_KEY in .env.local`);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(image);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `component.${framework === 'html' ? 'html' : framework === 'react' ? 'jsx' : 'vue'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const qualityLevels = ['FAST', 'BALANCED', 'PREMIUM'];

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div id="bg-animation" className="fixed inset-0 opacity-30 pointer-events-none z-0" />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b-4 border-cyan-400 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 pulse-glow" />
                  <Zap className="w-10 h-10 text-cyan-400 relative" strokeWidth={3} />
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tighter gradient-text">
                    PIXEL→CODE
                  </h1>
                  <p className="text-xs text-gray-400 tracking-widest uppercase">AI-Powered Design Conversion</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border-2 border-cyan-400 text-cyan-400 font-bold hover:bg-cyan-400 hover:text-black transition-all duration-200 transform hover:scale-105">
                  SIGN IN
                </button>
                <button className="px-4 py-2 border-2 border-yellow-300 bg-yellow-300 text-black font-bold hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105">
                  TRY DEMO
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">

          {/* Top Section: Upload & Settings */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left Panel: Upload */}
            <div className="space-y-6">
              <div
                className="h-full min-h-[400px] border-4 border-dashed border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 bg-black/30 backdrop-blur-sm relative overflow-hidden group cursor-pointer flex flex-col"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-magenta-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="scan-line absolute inset-x-0 h-1 bg-cyan-400/50 opacity-0 group-hover:opacity-100" />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {imagePreview ? (
                  <div className="relative p-6 flex-1 flex items-center justify-center">
                    <img src={imagePreview} alt="Preview" className="w-full h-full max-h-[400px] object-contain border-2 border-cyan-400/50" />
                    <div className="absolute top-10 right-10 bg-black/80 border-2 border-yellow-300 px-4 py-2">
                      <p className="text-yellow-300 font-bold text-sm">✓ LOADED</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative p-12 flex-1 flex flex-col items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="relative inline-block float-animation">
                        <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30" />
                        <Upload className="w-20 h-20 mx-auto text-cyan-400 relative" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-cyan-400 mb-2">DROP SCREENSHOT HERE</p>
                        <p className="text-gray-400 text-sm">or click to browse</p>
                      </div>
                      <div className="flex justify-center gap-4 text-xs text-gray-500">
                        <span className="border border-gray-700 px-3 py-1">PNG</span>
                        <span>•</span>
                        <span className="border border-gray-700 px-3 py-1">JPG</span>
                        <span>•</span>
                        <span className="border border-gray-700 px-3 py-1">WEBP</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Settings */}
            <div className="space-y-6">
              <div className="border-4 border-yellow-300/30 bg-black/30 backdrop-blur-sm p-6 space-y-6 border-glow h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-yellow-300" strokeWidth={3} />
                  <h3 className="text-xl font-black text-yellow-300">CONFIGURATION</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">TARGET FRAMEWORK</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['react', 'vue', 'html'].map((fw) => (
                        <button
                          key={fw}
                          onClick={() => setFramework(fw)}
                          className={`py-3 px-4 border-2 font-bold text-sm transition-all duration-200 transform hover:scale-105 ${framework === fw
                            ? 'border-cyan-400 bg-cyan-400 text-black'
                            : 'border-cyan-400/30 text-cyan-400 hover:border-cyan-400'
                            }`}
                        >
                          {fw.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">STYLING METHOD</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['tailwind', 'css'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStyle(st)}
                          className={`py-3 px-4 border-2 font-bold text-sm transition-all duration-200 transform hover:scale-105 ${style === st
                            ? 'border-magenta-400 bg-magenta-400 text-black'
                            : 'border-magenta-400/30 text-magenta-400 hover:border-magenta-400'
                            }`}
                        >
                          {st.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">QUALITY LEVEL</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="3"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-800 border-2 border-cyan-400 rounded appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #00ffff 0%, #00ffff ${((quality - 1) / 2) * 100}%, #1f2937 ${((quality - 1) / 2) * 100}%, #1f2937 100%)`
                        }}
                      />
                      <span className="text-cyan-400 font-bold text-sm w-24">{qualityLevels[quality - 1]}</span>
                    </div>
                  </div>

                  <button
                    onClick={generateCode}
                    disabled={!image || loading}
                    className={`w-full py-4 border-4 font-black text-lg transition-all duration-300 transform hover:scale-105 mt-4 ${!image || loading
                      ? 'border-gray-600 text-gray-600 cursor-not-allowed bg-transparent'
                      : 'border-yellow-300 text-black bg-yellow-300 hover:bg-yellow-400 cursor-pointer'
                      }`}
                  >
                    <span className="flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <Sparkles className="w-5 h-5 animate-spin" />
                          GENERATING...
                        </>
                      ) : (
                        <>
                          <Code className="w-5 h-5" />
                          GENERATE CODE
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section: Code/Preview Editor (Full Width) */}
          <div className="border-4 border-magenta-400/30 bg-black/30 backdrop-blur-sm overflow-hidden flex flex-col h-[700px] mb-16 relative z-20">
            {/* Tabs */}
            <div className="flex border-b-4 border-magenta-400/30">
              <button
                onClick={() => setActiveTab('code')}
                className={`flex-1 py-4 px-6 font-bold border-r-4 transition-all ${activeTab === 'code'
                  ? 'bg-magenta-400 text-black border-magenta-400'
                  : 'text-magenta-400 hover:bg-magenta-400/10 border-transparent'
                  }`}
              >
                <Code className="w-5 h-5 inline mr-2" />
                CODE
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 py-4 px-6 font-bold transition-all ${activeTab === 'preview'
                  ? 'bg-magenta-400 text-black'
                  : 'text-magenta-400 hover:bg-magenta-400/10'
                  }`}
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                PREVIEW
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
              {activeTab === 'code' ? (
                <div className="h-full overflow-auto p-6 bg-black/50">
                  {generatedCode ? (
                    <pre className="text-sm text-cyan-300">
                      <code>{generatedCode}</code>
                    </pre>
                  ) : loading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-6">
                        <div className="relative inline-block">
                          <div className="absolute inset-0 bg-magenta-400 blur-2xl opacity-30 pulse-glow" />
                          <Settings className="w-16 h-16 text-magenta-400 relative animate-spin" />
                        </div>
                        <p className="text-xl font-bold text-gray-400">PROCESSING YOUR DESIGN...</p>
                        <div className="w-64 h-2 bg-gray-800 border-2 border-cyan-400 mx-auto overflow-hidden loading-bar">
                          <div className="h-full bg-gradient-to-r from-cyan-400 via-yellow-300 to-magenta-400 w-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-6">
                        <div className="relative inline-block float-animation">
                          <div className="absolute inset-0 bg-magenta-400 blur-2xl opacity-30 pulse-glow" />
                          <svg className="w-16 h-16 text-magenta-400 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                        <p className="text-xl font-bold text-gray-400">UPLOAD A SCREENSHOT TO BEGIN</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full overflow-auto bg-white">
                  {generatedCode && (
                    <iframe
                      srcDoc={`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <script src="https://cdn.tailwindcss.com"></script>
                          <style>body { margin: 0; padding: 20px; }</style>
                        </head>
                        <body>
                          <div id="root"></div>
                          <script type="module">
                            ${generatedCode.includes('export default')
                          ? `
                              import React from 'https://esm.sh/react@18';
                              import ReactDOM from 'https://esm.sh/react-dom@18';
                              ${generatedCode}
                              const Component = ${generatedCode.match(/export default (\w+)/)?.[1] || 'App'};
                              ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Component));
                              `
                          : generatedCode}
                          </script>
                        </body>
                        </html>
                      `}
                      className="w-full h-full border-0"
                      title="Preview"
                    />
                  )}
                  {!generatedCode && (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                      <p className="text-gray-400 font-bold">PREVIEW WILL APPEAR HERE</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {generatedCode && (
                <div className="absolute top-4 right-4 flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="p-3 border-2 border-cyan-400 bg-black/80 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-200 transform hover:scale-110 glow-cyan"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={downloadCode}
                    className="p-3 border-2 border-yellow-300 bg-black/80 text-yellow-300 hover:bg-yellow-300 hover:text-black transition-all duration-200 transform hover:scale-110 glow-yellow"
                    title="Download code"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    className="p-3 border-2 border-magenta-400 bg-black/80 text-magenta-400 hover:bg-magenta-400 hover:text-black transition-all duration-200 transform hover:scale-110 glow-magenta"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Live Demo */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-8 h-8 border-2 border-green-400 rounded-full animate-pulse">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-green-400 tracking-widest uppercase">LIVE CONVERSION DEMO</h2>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-4 border-gray-800 bg-black shadow-2xl shadow-cyan-900/20 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

              {/* Video Player */}
              <div className="aspect-video w-full relative">
                <video
                  ref={videoRef}
                  src="./ss.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
                  <div className="flex items-end justify-between pointer-events-auto">
                    <div>
                      <h3 className="text-4xl font-black text-white mb-2 tracking-tight">
                        Pixel<span className="text-cyan-400">Forge</span> AI in Action
                      </h3>
                      <p className="text-gray-300 max-w-xl text-lg mb-6">
                        Watch how disjointed pixels are instantly transformed into clean, production-ready code.
                      </p>

                      <button
                        onClick={toggleMute}
                        className="px-6 py-3 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-colors flex items-center gap-2"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" fill="currentColor" /> : <Volume2 className="w-5 h-5" fill="currentColor" />}
                        {isMuted ? 'UNMUTE DEMO' : 'MUTE DEMO'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Play Button (Interactive) */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <button
                    onClick={togglePlay}
                    className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 hover:scale-110 cursor-pointer pointer-events-auto bg-black/20 hover:bg-black/40"
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" fill="currentColor" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t-4 border-cyan-400/30 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between text-sm text-gray-500 flex-wrap gap-4">
              <p>Powered by Claude AI • Production-Ready Code Generation</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">API</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
                <p className="font-bold text-cyan-400">v2.0.0-BETA</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}