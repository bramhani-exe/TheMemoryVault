import React from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#43634E] uppercase tracking-wider font-bold">
            <Shield className="w-4 h-4" />
            <span>Data Transparency Statement</span>
          </div>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-[#1E3827]">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-[#4A5B50] leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">1. Local-Only Game State</h2>
            <p>
              The Memory Vault is an educational browser game. All gameplay progress, keys collected,
              unlocked chambers, puzzle solutions, and scores are stored exclusively within your
              browser's standard <code className="bg-[#ECE5D8] px-1 py-0.5 rounded text-xs font-mono-code">localStorage</code>.
              No game state is transmitted to, processed by, or saved on any remote database or server.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">2. Zero Personal Data Collection</h2>
            <p>
              The application does not collect your name, email address, IP address, device telemetry,
              or tracking cookies. We do not integrate third-party advertising SDKs, tracking pixels, or
              external analytics scripts.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">3. Local Audio Generation</h2>
            <p>
              All sound effects (clicks, chimes, and door locks) are generated procedurally on-demand
              via the browser's native Web Audio API oscillators. No external audio files are downloaded
              from third-party CDNs.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">4. Clearing Your Data</h2>
            <p>
              You can wipe all saved progress at any time by clicking the reset icon in the header bar
              or by clearing your browser's local site storage for this origin.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-sm text-[#1E3827]">5. Inquiries</h2>
            <p>
              For academic questions regarding the Computer Organization and Architecture (COA) Module 5
              syllabus curriculum represented in this game, please consult your course instructor or syllabus guidelines.
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
