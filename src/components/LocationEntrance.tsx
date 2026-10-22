import React from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../data/locationsData';
import { ArrowLeft, ArrowRight, Key, CheckCircle2, Lock, Award, BookOpen } from 'lucide-react';

export const LocationEntrance: React.FC = () => {
  const {
    selectedLocationId,
    progress,
    goToMap,
    enterChamber,
    setScreen
  } = useGame();

  const location = LOCATIONS.find(l => l.id === selectedLocationId);

  if (!location) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-[#4A5B50]">No sector selected.</p>
        <button onClick={goToMap} className="mt-4 px-4 py-2 bg-[#1E3827] text-white rounded cursor-pointer">
          Return to Adventure Map
        </button>
      </div>
    );
  }

  const collectedCount = location.puzzles.filter(p => progress.collectedKeys.includes(p.id)).length;
  const isFullyComplete = progress.completedLocations.includes(location.id);
  const highestReached = progress.visitedChambers[location.id] || 1;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-6">
      {/* Top Breadcrumb & Return to Map */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToMap}
          className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-[#4A5B50] hover:text-[#1E3827] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Adventure Map</span>
        </button>

        <div className="text-xs font-mono-code text-[#8F6F28] font-bold">
          {location.syllabusModuleHours}
        </div>
      </div>

      {/* Main Location Presentation */}
      <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded p-6 md:p-8 space-y-6 shadow-xs">
        <div className="space-y-2">
          <div className="text-xs font-mono-code text-[#43634E] uppercase tracking-wider font-bold">
            Sector Archive
          </div>
          <h1 className="font-serif-title text-2xl md:text-4xl font-bold text-[#1E3827]">
            {location.name}
          </h1>
          <div className="text-sm font-semibold text-[#8F6F28]">
            {location.topicTitle}
          </div>
        </div>

        <p className="text-sm md:text-base text-[#4A5B50] leading-relaxed max-w-3xl">
          {location.description}
        </p>

        {/* Environmental Lore */}
        <div className="p-4 bg-[#F3ECE1] border-l-3 border-[#8F6F28] rounded-r text-xs text-[#5E6861] leading-relaxed">
          <span className="font-bold text-[#1E3827]">Chamber Environment: </span>
          {location.environmentTheme}
        </div>

        {/* Chamber Progression Overview (1 to 5) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono-code">
            <span className="font-semibold text-[#1E3827]">Five Chamber Sequence</span>
            <span className="text-[#8F6F28] font-bold">{collectedCount} of 5 Keys Recovered</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {location.puzzles.map((puzzle) => {
              const isSolved = progress.solvedPuzzles.includes(puzzle.id);
              const hasKey = progress.collectedKeys.includes(puzzle.id);
              const isAccessible = puzzle.number <= highestReached || isSolved;

              return (
                <div
                  key={puzzle.id}
                  className={`p-3.5 rounded border text-xs flex flex-col justify-between transition-all ${
                    isSolved
                      ? 'bg-[#F2F6F3] border-[#94AA99] text-[#1E3827]'
                      : isAccessible
                      ? 'bg-[#FFFDF9] border-[#C29B48] text-[#1E3827] shadow-xs'
                      : 'bg-[#ECE5D8] border-[#DDD5C3] text-[#8A7D69] opacity-75'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-mono-code text-[11px]">
                      <span>Chamber {puzzle.number}</span>
                      {hasKey ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#43634E]" />
                      ) : isAccessible ? (
                        <Key className="w-3.5 h-3.5 text-[#C29B48]" />
                      ) : (
                        <Lock className="w-3 h-3 text-[#9E9178]" />
                      )}
                    </div>
                    <div className="font-bold leading-tight mb-1">
                      {puzzle.title}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#DDD5C3]/60 flex items-center justify-between">
                    {isSolved ? (
                      <button
                        onClick={() => enterChamber(puzzle.number)}
                        className="text-[11px] text-[#43634E] hover:underline font-medium cursor-pointer"
                      >
                        Review
                      </button>
                    ) : isAccessible ? (
                      <button
                        onClick={() => enterChamber(puzzle.number)}
                        className="text-[11px] text-[#8F6F28] font-bold hover:underline cursor-pointer"
                      >
                        Active
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#9E9178]">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sector Relic / Treasure Preview */}
        <div className="p-4 bg-[#F5F1E8] border border-[#DDD5C3] rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#E4DAC7] border border-[#C5BBA7] flex items-center justify-center text-[#8F6F28] shrink-0 font-serif-title font-bold text-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono-code text-[#8F6F28]">Topic Relic</div>
              <div className="font-serif-title text-sm font-bold text-[#1E3827]">
                {location.treasure.name}
              </div>
              <div className="text-xs text-[#5E6861]">
                {isFullyComplete ? 'Recovered and stored in inventory' : 'Awaits discovery in Chamber 5'}
              </div>
            </div>
          </div>

          {isFullyComplete && (
            <button
              onClick={() => setScreen('treasure')}
              className="text-xs text-[#43634E] hover:text-[#1E3827] font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Inspect Mastery Treasure</span>
            </button>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => enterChamber(Math.min(highestReached, 5))}
            className="px-6 py-3 bg-[#1E3827] hover:bg-[#2A4D37] text-white font-medium text-sm rounded transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>{isFullyComplete ? 'Re-enter Chamber 1' : `Enter Chamber ${Math.min(highestReached, 5)}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-xs text-[#6E7E73] font-mono-code">
            Progress automatically saved · Revisit solved chambers anytime
          </div>
        </div>
      </div>
    </div>
  );
};
