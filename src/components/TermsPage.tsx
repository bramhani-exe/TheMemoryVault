import React from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { goToMap } = useGame();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#DDD5C3]">
        <button
          onClick={goToMap}
          className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-[#4A5B50] hover:text-[#1E3827] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Adventure Map</span>
        </button>
        <div className="text-xs font-mono-code text-[#6E7E73]">
          Last Updated: October 2026
        </div>
      </div>

      <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded p-6 md:p-10 space-y-6 text-[#1E3827]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Educational Use Agreement</span>
          </div>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-[#1E3827]">
            Terms and Conditions
          </h1>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-[#4A5B50] leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">1. Purpose and Educational Scope</h2>
            <p>
              The Memory Vault is provided as an interactive educational simulation designed to reinforce
              principles of Computer Organization and Architecture (COA) Module 5:
              Memory Organization (Memory hierarchy, main memory, and cache memory mapping).
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">2. Academic Accuracy and Use of Content</h2>
            <p>
              All mathematical calculations, cache address decomposition equations, and memory organization
              principles have been constructed to reflect standard academic textbook formulations.
              Students and educators are permitted to utilize the interactive exercises for self-study, lab assignments,
              and classroom demonstrations.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">3. Five-Minute Presentation Optimization</h2>
            <p>
              This streamlined edition has been calibrated for live five-minute demonstrations, featuring 15
              quick-solving visual challenges with immediate educational takeaways.
            </p>
          </section>
        </div>

        <div className="pt-4 border-t border-[#DDD5C3]">
          <button
            onClick={goToMap}
            className="px-5 py-2.5 bg-[#1E3827] hover:bg-[#2A4D37] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            Back to Adventure Map
          </button>
        </div>
      </div>
    </div>
  );
};
