import React from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../data/locationsData';
import { Award, ArrowLeft, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export const TreasureChamber: React.FC = () => {
  const { selectedLocationId, goToMap, toggleJournal } = useGame();

  const location = LOCATIONS.find(l => l.id === selectedLocationId);

  if (!location) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-[#4A5B50]">No sector treasure found.</p>
        <button onClick={goToMap} className="mt-4 px-4 py-2 bg-[#1E3827] text-white rounded cursor-pointer">
          Return to Adventure Map
        </button>
      </div>
    );
  }

  const treasure = location.treasure;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToMap}
          className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-[#4A5B50] hover:text-[#1E3827] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Adventure Map</span>
        </button>

        <div className="text-xs font-mono-code text-[#43634E] flex items-center gap-1 font-bold">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Sector Cleared (5/5 Keys)</span>
        </div>
      </div>

      {/* Illustrated Treasure Plinth */}
      <div className="bg-[#FAF8F5] border border-[#C29B48] rounded p-6 md:p-10 space-y-6 text-center shadow-sm">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#8F6F28] uppercase tracking-widest bg-[#F4EFE6] px-3 py-1 rounded border border-[#DDD5C3] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Topic Treasure Restored</span>
        </div>

        <div className="max-w-md mx-auto aspect-square max-h-56 bg-[#F3ECE1] border border-[#DDD5C3] rounded flex items-center justify-center p-6 shadow-inner relative overflow-hidden">
          {/* Relic Visual Rendering */}
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[#E5DFC8] border-2 border-[#C29B48] flex items-center justify-center text-[#8F6F28] shadow-md animate-key-float">
              <Award className="w-12 h-12" />
            </div>
            <div className="mt-3 font-mono-code text-xs font-bold text-[#1E3827] bg-white/90 px-2.5 py-0.5 rounded border border-[#DDD5C3]">
              {treasure.academicSymbol}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-[#1E3827]">
            {treasure.name}
          </h1>
          <p className="text-xs md:text-sm text-[#8F6F28] font-mono-code">
            {location.name} · {location.topicTitle}
          </p>
        </div>

        <p className="text-sm text-[#4A5B50] leading-relaxed max-w-xl mx-auto">
          {treasure.description}
        </p>

        {/* Academic Role Inscription */}
        <div className="p-4 bg-[#F2F6F3] border border-[#94AA99] rounded max-w-2xl mx-auto text-left space-y-1.5">
          <div className="text-xs font-bold text-[#245431] uppercase tracking-wider font-mono-code">
            Vault Restoration Function
          </div>
          <p className="text-xs text-[#2A4D37] leading-relaxed">
            {treasure.restorationRole}
          </p>
        </div>

        {/* Academic Topic Mastery Summary */}
        <div className="p-4 bg-[#F5EFE4] border border-[#DDD5C3] rounded max-w-2xl mx-auto text-left space-y-1.5">
          <div className="text-xs font-bold text-[#1E3827] uppercase tracking-wider font-mono-code">
            Academic Concept Mastery
          </div>
          <p className="text-xs text-[#5E6861] leading-relaxed">
            {location.masterySummary}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={goToMap}
            className="px-6 py-2.5 bg-[#1E3827] hover:bg-[#2A4D37] text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-xs"
          >
            Return to Adventure Map
          </button>

          <button
            onClick={() => toggleJournal(true)}
            className="px-4 py-2.5 bg-[#ECE5D8] hover:bg-[#DDD5C3] text-[#1E3827] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#43634E]" />
            <span>Open Learning Journal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
