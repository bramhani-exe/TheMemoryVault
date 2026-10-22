import React from 'react';
import { useGame } from '../context/GameContext';
import { Key, Layers, BookOpen, ArrowRight, Award, Cpu } from 'lucide-react';

export const OpeningScreen: React.FC = () => {
  const { goToMap, setScreen } = useGame();

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-between max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Hero Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Narrative & Primary Entry */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#8F6F28] font-mono-code font-bold">
            Computer Organization and Architecture · Module 5
          </div>

          <h1 className="font-serif-title text-3xl md:text-5xl lg:text-6xl text-[#1E3827] leading-[1.15] font-bold text-balance">
            THE MEMORY VAULT
          </h1>

          <div className="p-4 bg-[#F5EFE4] border-l-4 border-[#C29B48] rounded-r text-sm md:text-base font-serif-title font-bold text-[#1E3827]">
            Explore the memory world. Solve 15 puzzles. Collect the keys. Unlock the Memory Vault.
          </div>

          <p className="text-sm md:text-base text-[#4A5B50] leading-relaxed max-w-xl">
            Journey through three architectural sectors of computer memory: the Memory Hierarchy Spire,
            the Primary Core laboratory, and the Cache Citadel. Each sector contains five visual puzzles
            designed for clear problem-solving and immediate interactive learning.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={goToMap}
              className="px-7 py-3.5 bg-[#1E3827] hover:bg-[#2A4D37] text-[#FAF8F5] font-semibold text-sm rounded shadow-sm hover:shadow transition-all flex items-center gap-2 group whitespace-nowrap cursor-pointer"
            >
              <span>Enter Adventure Map</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setScreen('privacy')}
              className="px-4 py-3 text-sm text-[#4A5B50] hover:text-[#1E3827] font-medium transition-colors cursor-pointer"
            >
              Educational Scope
            </button>
          </div>

          {/* Unboxed Metadata Strip */}
          <div className="pt-4 border-t border-[#DDD5C3] flex flex-wrap items-center gap-3 text-xs text-[#6E7E73] font-mono-code">
            <span>3 Key Topics</span>
            <span aria-hidden="true">·</span>
            <span>15 Visual Puzzles</span>
            <span aria-hidden="true">·</span>
            <span>15 Vault Keys</span>
            <span aria-hidden="true">·</span>
            <span>3 Topic Relics</span>
          </div>
        </div>

        {/* Right Column: Architectural Vault Motif Visual */}
        <div className="lg:col-span-5">
          <div className="relative p-6 bg-[#F4EFE6] border border-[#DDD5C3] rounded shadow-inner text-[#1E3827]">
            {/* Illustrated Arch Gateway SVG */}
            <div className="w-full aspect-4/3 flex items-center justify-center relative overflow-hidden bg-[#ECE5D8] rounded border border-[#D5CCBA] p-4">
              <svg viewBox="0 0 300 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stone Arch Portal */}
                <path d="M40 230 V110 Q40 30 150 30 Q260 30 260 110 V230 Z" fill="#D3C7B2" stroke="#8E8069" strokeWidth="3" />
                <path d="M60 230 V115 Q60 50 150 50 Q240 50 240 115 V230 Z" fill="#D6CBB7" stroke="#8A7D65" strokeWidth="2" />
                
                {/* Vault Door (Brass & Wood Grain) */}
                <rect x="75" y="65" width="150" height="165" rx="4" fill="#6A543A" stroke="#4F3E29" strokeWidth="3" />
                
                {/* Door Panels */}
                <rect x="85" y="75" width="60" height="70" fill="#7C6549" stroke="#4F3E29" strokeWidth="1.5" />
                <rect x="155" y="75" width="60" height="70" fill="#7C6549" stroke="#4F3E29" strokeWidth="1.5" />
                <rect x="85" y="155" width="60" height="65" fill="#7C6549" stroke="#4F3E29" strokeWidth="1.5" />
                <rect x="155" y="155" width="60" height="65" fill="#7C6549" stroke="#4F3E29" strokeWidth="1.5" />
                
                {/* Concentric Vault Wheel Lock */}
                <circle cx="150" cy="145" r="28" fill="#C29B48" stroke="#8F6F28" strokeWidth="3" />
                <circle cx="150" cy="145" r="18" fill="#E5BE65" stroke="#8F6F28" strokeWidth="2" />
                <circle cx="150" cy="145" r="6" fill="#4F3E29" />
                {/* Wheel Spokes */}
                <line x1="150" y1="117" x2="150" y2="173" stroke="#8F6F28" strokeWidth="3" />
                <line x1="122" y1="145" x2="178" y2="145" stroke="#8F6F28" strokeWidth="3" />
                <line x1="130" y1="125" x2="170" y2="165" stroke="#8F6F28" strokeWidth="3" />
                <line x1="130" y1="165" x2="170" y2="125" stroke="#8F6F28" strokeWidth="3" />

                {/* Keyhole Inset */}
                <path d="M148 141 L152 141 L154 148 L146 148 Z" fill="#1C271F" />
                <circle cx="150" cy="140" r="3" fill="#1C271F" />

                {/* Silicon Traces along stone frame */}
                <path d="M50 230 V130 L30 110" stroke="#C29B48" strokeWidth="2" strokeDasharray="4 3" />
                <path d="M250 230 V130 L270 110" stroke="#C29B48" strokeWidth="2" strokeDasharray="4 3" />
              </svg>
            </div>

            <div className="mt-4 text-center">
              <h2 className="font-serif-title text-base font-bold text-[#1E3827]">
                Sealed Central Vault
              </h2>
              <p className="text-xs text-[#5E6861] mt-1">
                Unlocked when all three syllabus relics are assembled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Academic Domains Grid */}
      <div className="mt-8 pt-6 border-t border-[#DDD5C3]">
        <h2 className="font-serif-title text-base font-bold text-[#1E3827] mb-4">
          Three Core Topics of Module 5
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={goToMap}
            className="p-4 bg-[#F8F5EE] border border-[#DDD5C3] rounded hover:border-[#94AA99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Layers className="w-4 h-4 text-[#43634E]" />
              <h3 className="font-semibold text-sm text-[#1E3827]">1. Memory Hierarchy</h3>
            </div>
            <p className="text-xs text-[#5E6861] leading-relaxed">
              Speed vs. capacity pyramid, CPU registers, intermediate SRAM cache, and the principle of locality.
            </p>
          </div>

          <div
            onClick={goToMap}
            className="p-4 bg-[#F8F5EE] border border-[#DDD5C3] rounded hover:border-[#94AA99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Cpu className="w-4 h-4 text-[#C29B48]" />
              <h3 className="font-semibold text-sm text-[#1E3827]">2. Main Memory</h3>
            </div>
            <p className="text-xs text-[#5E6861] leading-relaxed">
              DIMM RAM sticks, active working memory, volatility blackout experiment, and DRAM capacitive refresh.
            </p>
          </div>

          <div
            onClick={goToMap}
            className="p-4 bg-[#F8F5EE] border border-[#DDD5C3] rounded hover:border-[#94AA99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <BookOpen className="w-4 h-4 text-[#236773]" />
              <h3 className="font-semibold text-sm text-[#1E3827]">3. Cache Memory Mapping</h3>
            </div>
            <p className="text-xs text-[#5E6861] leading-relaxed">
              Direct Mapping modulo calculations (Block mod 4), address TAG verification, Cache Hits, and Associativity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
