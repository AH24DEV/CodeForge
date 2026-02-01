'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Code, Sparkles, Download, Copy, Settings, Share2, Zap } from 'lucide-react';

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

  // Mock code generation - FREE VERSION (No API key needed!)
  const generateCode = async () => {
    if (!image) return;

    setLoading(true);
    setGeneratedCode('');

    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    // Generate mock code based on framework and style
    let mockCode = '';

    if (framework === 'react') {
      if (style === 'tailwind') {
        mockCode = `import React from 'react';

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">
            🎨 Demo Component
          </h1>
          <p className="text-lg opacity-90">
            This is a FREE mock version. Upload your design and see it transform!
          </p>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border-2 border-cyan-200">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Built with modern React and optimized for performance.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pixel Perfect</h3>
              <p className="text-gray-600">Responsive design that works on all devices beautifully.</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Started</h2>
            <p className="text-gray-600 mb-6">
              This is a demo component generated from your screenshot. 
              To get AI-powered real conversions, you can add an Anthropic API key.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`;
      } else {
        mockCode = `import React from 'react';

export default function Component() {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    },
    card: {
      maxWidth: '800px',
      width: '100%',
      background: 'white',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      overflow: 'hidden',
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '3rem',
      color: 'white',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    content: {
      padding: '2rem',
    },
    button: {
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🎨 Demo Component</h1>
          <p>Generated from your screenshot - FREE mock version</p>
        </div>
        <div style={styles.content}>
          <h2>Welcome!</h2>
          <p>This is a demonstration of the code generation feature.</p>
          <button style={styles.button}>Get Started</button>
        </div>
      </div>
    </div>
  );
}`;
      }
    } else if (framework === 'vue') {
      mockCode = `<template>
  <div class="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-8">
    <div class="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white">
        <h1 class="text-4xl font-bold mb-4">🌟 Vue Component</h1>
        <p class="text-lg opacity-90">Generated from your design - Demo Version</p>
      </div>
      
      <div class="p-8">
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="feature in features" :key="feature.id" class="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
        
        <button @click="handleClick" class="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
          Click Me
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const features = ref([
  { id: 1, title: 'Reactive', description: 'Vue 3 Composition API with full reactivity' },
  { id: 2, title: 'Modern', description: 'Built with the latest Vue.js best practices' },
]);

const handleClick = () => {
  alert('Demo component - Add API key for real AI generation!');
};
</script>`;
    } else {
      // HTML
      mockCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Component</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="min-h-screen bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center p-8">
    <div class="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="bg-gradient-to-r from-orange-600 to-red-600 p-8 text-white">
        <h1 class="text-4xl font-bold mb-4">🚀 HTML Component</h1>
        <p class="text-lg opacity-90">Pure HTML/CSS/JS - No framework needed!</p>
      </div>
      
      <div class="p-8">
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200 text-center">
            <div class="text-4xl mb-2">⚡</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Fast</h3>
            <p class="text-gray-600">No build process required</p>
          </div>
          
          <div class="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200 text-center">
            <div class="text-4xl mb-2">🎨</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Beautiful</h3>
            <p class="text-gray-600">Styled with Tailwind CSS</p>
          </div>
          
          <div class="bg-red-50 p-6 rounded-2xl border-2 border-red-200 text-center">
            <div class="text-4xl mb-2">✨</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Simple</h3>
            <p class="text-gray-600">Easy to customize</p>
          </div>
        </div>
        
        <button onclick="alert('Demo version - Add API key for AI generation!')" class="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
          Try It Out
        </button>
      </div>
    </div>
  </div>
</body>
</html>`;
    }

    setGeneratedCode(mockCode);
    setLoading(false);
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
                  <p className="text-xs text-gray-400 tracking-widest uppercase">FREE Demo Version</p>
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

        {/* Info Banner */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-green-500/10 border-2 border-green-500 p-4 rounded flex items-start gap-3">
            <div className="text-2xl">✨</div>
            <div>
              <p className="text-green-400 font-bold">FREE Demo Mode - No API Key Required!</p>
              <p className="text-green-300 text-sm mt-1">
                Upload any screenshot and get instant mock code. This version generates demo components without using AI.
                For real AI-powered conversions, you can add an Anthropic API key later.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel */}
            <div className="space-y-6">
              {/* Upload Area */}
              <div 
                className="border-4 border-dashed border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 bg-black/30 backdrop-blur-sm relative overflow-hidden group cursor-pointer"
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
                  <div className="relative p-6">
                    <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-96 object-contain border-2 border-cyan-400/50" />
                    <div className="absolute top-10 right-10 bg-black/80 border-2 border-yellow-300 px-4 py-2">
                      <p className="text-yellow-300 font-bold text-sm">✓ LOADED</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative p-12">
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

              {/* Settings Panel */}
              <div className="border-4 border-yellow-300/30 bg-black/30 backdrop-blur-sm p-6 space-y-6 border-glow">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-yellow-300" strokeWidth={3} />
                  <h3 className="text-xl font-black text-yellow-300">CONFIGURATION</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">TARGET FRAMEWORK</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['react', 'vue', 'html'].map((fw) => (
                        <button
                          key={fw}
                          onClick={() => setFramework(fw)}
                          className={`py-3 px-4 border-2 font-bold text-sm transition-all duration-200 transform hover:scale-105 ${
                            framework === fw
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
                          className={`py-3 px-4 border-2 font-bold text-sm transition-all duration-200 transform hover:scale-105 ${
                            style === st
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
                </div>

                <button
                  onClick={generateCode}
                  disabled={!image || loading}
                  className={`w-full py-4 border-4 font-black text-lg transition-all duration-300 transform hover:scale-105 ${
                    !image || loading
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

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-cyan-400/30 bg-black/30 backdrop-blur-sm p-4 text-center hover:border-cyan-400 transition-all duration-300 transform hover:scale-105">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-cyan-400" strokeWidth={2} />
                  <p className="text-sm font-bold text-gray-300">100% Free</p>
                </div>
                <div className="border-2 border-yellow-300/30 bg-black/30 backdrop-blur-sm p-4 text-center hover:border-yellow-300 transition-all duration-300 transform hover:scale-105">
                  <svg className="w-8 h-8 mx-auto mb-2 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-bold text-gray-300">No API Key</p>
                </div>
              </div>
            </div>

            {/* Right Panel - Same as before */}
            <div className="space-y-6">
              <div className="border-4 border-magenta-400/30 bg-black/30 backdrop-blur-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
                {/* Tabs */}
                <div className="flex border-b-4 border-magenta-400/30">
                  <button 
                    onClick={() => setActiveTab('code')}
                    className={`flex-1 py-4 px-6 font-bold border-r-4 transition-all ${
                      activeTab === 'code' 
                        ? 'bg-magenta-400 text-black border-magenta-400' 
                        : 'text-magenta-400 hover:bg-magenta-400/10 border-transparent'
                    }`}
                  >
                    <Code className="w-5 h-5 inline mr-2" />
                    CODE
                  </button>
                  <button 
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 py-4 px-6 font-bold transition-all ${
                      activeTab === 'preview' 
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
                            <p className="text-xl font-bold text-gray-400">GENERATING DEMO CODE...</p>
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
                            <p className="text-sm text-gray-500">Free demo - No API key required!</p>
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
                                  const Component = ${generatedCode.match(/export default (\w+)/)?.[1] || 'Component'};
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

              {/* Stats */}
              {generatedCode && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-cyan-400/30 bg-black/30 backdrop-blur-sm p-4 text-center hover:border-cyan-400 transition-all duration-300">
                    <p className="text-2xl font-black text-cyan-400">{generatedCode.split('\n').length}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Lines</p>
                  </div>
                  <div className="border-2 border-yellow-300/30 bg-black/30 backdrop-blur-sm p-4 text-center hover:border-yellow-300 transition-all duration-300">
                    <p className="text-2xl font-black text-yellow-300">{framework.toUpperCase()}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Framework</p>
                  </div>
                  <div className="border-2 border-magenta-400/30 bg-black/30 backdrop-blur-sm p-4 text-center hover:border-magenta-400 transition-all duration-300">
                    <p className="text-2xl font-black text-magenta-400">{(generatedCode.length / 1024).toFixed(1)}KB</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Size</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t-4 border-cyan-400/30 bg-black/30 backdrop-blur-sm mt-12">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between text-sm text-gray-500 flex-wrap gap-4">
              <p>FREE Demo Version • No AI • No API Key Required</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Get API Key</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
                <p className="font-bold text-cyan-400">v2.0.0-FREE</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}